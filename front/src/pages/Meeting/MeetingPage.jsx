import 'regenerator-runtime/runtime';
import { useEffect, useState, createContext, useRef } from "react";
import { styled } from "styled-components";
import { OpenVidu } from 'openvidu-browser';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MeetingHeader from "../../components/Meeting/MeetingHeader";
import ProgressBar from "../../components/Meeting/ProgressBar";
import MeetingFooter from "../../components/Meeting/MeetingFooter";
import axios from "axios";
import UserVideoComponent from '../../components/Meeting/UserVideoComponent';

// Container for the entire page
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--MEETING_BACKGROUND);
  color: var(--LIGHT);
  width: 100%;
  min-width: 1024px;
  height: 100vh;
`;

// Main content area
const MainContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

const ParticipantGrid = styled.div`
  display: flex;
  flex-wrap: nowrap; /* Do not wrap, enable horizontal scrolling */
  overflow-x: auto; /* Allow horizontal scroll */
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: calc(100vh - 240px);
`;

const ScrollButton = styled.button`
  background-color: var(--LIGHT);
  color: var(--DARK);
  border: none;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  &:hover {
    background-color: var(--HOVER_LIGHT);
  }
`;

const LeftScrollButton = styled(ScrollButton)`
  left: 10px;
`;

const RightScrollButton = styled(ScrollButton)`
  right: 10px;
`;

// Context 정의
export const MeetingContext = createContext(); // Context를 export하여 다른 파일에서 사용할 수 있도록 함

function MeetingPage() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const userId = useSelector((state)=>state.auth.userId);
  const username = useSelector((state) => state.auth.nickname);
  const roleId = useSelector((state)=>state.auth.roleId);
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const APPLICATION_SERVER_URL = "http://localhost:5000/";
  const [OV, setOV] = useState(undefined);
  // 현재 createSession 응답을 저장해서 강사가 미리 세션을 만든 경우가 아니면
  // 다시 내강의실로 navigate되도록 구현해놓았습니다.
  const [isSession, setIsSession] = useState(undefined);
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState(undefined);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  // chat
  const [chatMessages, setChatMessages] = useState([]);
  const [statusMessages, setStatusMessages] = useState([]);
  // State for mute and video control
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  // State for pagination
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisible = 2; // Maximum visible participants

  const handleAudioEnabled = () => {
    if (publisher) {
      publisher.publishAudio(!audioEnabled);
      setAudioEnabled(!audioEnabled);
    }
  };

  const handleVideoEnabled = () => {
    if (publisher) {
      publisher.publishVideo(!videoEnabled);
      setVideoEnabled(!videoEnabled);
    }
  };

  useEffect(() => {
    setOV(new OpenVidu());
  }, []);

  useEffect(()=>{
    setMyUserName(username);
  },[username]);

  useEffect(() => {
    if (OV && myUserName && userId && roleId && lectureId) {
      if(roleId==2){
        createSession();
      }else if(roleId==1){
        joinSession();
      }
    }
  }, [OV, myUserName, userId, roleId, lectureId]);

  useEffect(()=>{
    return () => {
      leaveSession();
    };
  },[session]);

  const createSession = async (sessionId) => {
    // const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
    //   headers: { 'Content-Type': 'application/json', },
    // });
    // return response.data; // The sessionId
    const response = await axios.post(`${baseURL}/sessions/${lectureId}?userId=${userId}`, null);
    if(response?.data?.code==200){
      joinSession();
    }else{
      alert("세션에 접근할 수 없습니다!");
      navigate("/video");
    }
  };

  const getToken = async () => {
    // const sessionId = await createSession(mySessionId);
    // return await createToken(sessionId);
    return await createToken();
  };

  const createToken = async () => {
    // const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
    //   headers: { 'Content-Type': 'application/json', },
    // });
    // return response.data; // The token
    const response = await axios.post(`${baseURL}/sessions/${lectureId}/get-token?userId=${userId}`,null, {headers: {'Content-Type': 'application/json'}});
    if(response?.data?.code==403){
      alert(response?.data?.message);
      navigate("/video");
    }
    const token = response?.data?.data;
    return token;
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((subscriber) => subscriber !== streamManager)
    );
  };

  useEffect(()=>{
    console.log(statusMessages);
  },[statusMessages]);

  const joinSession = async () => {
    const newSession = OV.initSession();
    setSession(newSession);

    console.log("===>newSession: ", newSession);
    newSession.on('streamCreated', (event) => {
      console.log("A======>",event.stream.connection);
      const connectionData = event.stream.connection;
      const parsedData = JSON.parse(connectionData?.data.split('%/%user-data')[0]);
      if(connectionData.connectionId == newSession.connection.connectionId) return;

      // 수강생이면 강사만 subscribe할 수 있음
      if(roleId==1 && parsedData.data?.roleId==1) return;
      const subscriber = newSession.subscribe(event.stream, undefined);
      if (parsedData?.username !== myUserName) {
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      }
    });

    newSession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
      leaveSession();
    });

    newSession.on('exception', (exception) => {
      console.warn(exception);
    });

    newSession.on('signal:chat', (event) => {
      console.log('New chat message:', event.data);
      const parsedData = JSON.parse(event.data);
      // 여기에 메시지를 화면에 표시하는 로직을 추가할 수 있습니다.
      setChatMessages((prev)=>[...prev, parsedData]);
    });

    newSession.on('signal:status', (event) => {
      console.log('New chat message:', event.data);
      const parsedData = JSON.parse(event.data);
      // 여기에 메시지를 화면에 표시하는 로직을 추가할 수 있습니다.
      setStatusMessages((prev)=>[...prev, parsedData]);
    });

    const token = await getToken();

    newSession.connect(token, JSON.stringify({ username: myUserName, roleId: roleId }))
      .then(async () => {
        const newPublisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });

        newSession.publish(newPublisher);

        setPublisher(newPublisher);
        setMainStreamManager(newPublisher);
      })
      .catch((error) => {
        console.log('There was an error connecting to the session:', error.code, error.message);
      });
  };

  const leaveSession = async() => {
    if (session) {
      session.disconnect();
      if(roleId==1){
        // 수강생이면 그냥 토큰 제거
        const res = await axios.post(`${baseURL}/session/${lectureId}/remove-token?userId=${userId}`, null);
      }else if(roleId==2){
        // 강사이면 토큰 제거 + 라이브 세션 제거
        const res = await axios.delete(`${baseURL}/sessions/${lectureId}?userId=${userId}`);
      }
    }

    setOV(null);
    setPublisher(undefined);
    setMainStreamManager(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName(undefined);
  };

  // Calculate flex-basis based on the number of visible participants
  const getFlexBasis = () => {
    return `calc(${100 / Math.min(subscribers.length + 1, maxVisible)}% - 16px)`;
  };

  // Functions to navigate between subscriber groups
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, Math.ceil((subscribers.length + 1) / maxVisible) - 1));
  };

  // Include publisher in pagination logic
  const visibleParticipants = [publisher, ...subscribers].slice(currentIndex * maxVisible, (currentIndex + 1) * maxVisible);

  // STT /////////////////////////////////////////////////////////////////////////////////////////////////////
  const steps = [
    "1단계. 향 조합 비율 결정하기",
    "2단계. 향기 선택하기",
    "3단계. 향 배합 비율 확인하기",
  ];
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepLoading, setStepLoading] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [text, setText] = useState();
  const handleStartStep = () => {
    setStepLoading(true);
    SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
    setCurrentStep((prev) => prev + 1);
    setStepLoading(false);
    setStatusMessages([]);
  }
  const handleNextStep = async () => {
    setStepLoading(true);
    setText(transcript);
    const sendText = transcript;
    const originText = [sendText];
    // TODO: await를 해야하지만... duplicate key가 안되서 어찌하지..
    axios.post(`${baseURL}/summary/${lectureId}/${currentStep+1}`, originText);
    resetTranscript();
    setCurrentStep((prev) => prev + 1);
    setStepLoading(false);
    setStatusMessages([]);
  }
  const handleEndStep = async() => {
    if (!listening) return;
    setStepLoading(true);
    setText(transcript);
    const sendText = transcript;
    const originText = [sendText];
    // TODO: await를 해야하지만... duplicate key가 안되서 어찌하지..
    axios.post(`${baseURL}/summary/${lectureId}/${currentStep+1}`, originText);
    resetTranscript();
    setCurrentStep((prev) => prev + 1);
    setStepLoading(false);
    SpeechRecognition.abortListening();
    setStepLoading(false);
    setStatusMessages([]);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // chat ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const sendChat = (senderName, senderMsg, time, target) => {
    if(session){
      session.signal({
        data: JSON.stringify({
            message: senderMsg, 
            sender: senderName,
            time: time,
        }),
        to: target ? [] : [],
        type: 'chat'
    })
    .then(() => {
        console.log('Message successfully sent');
    })
    .catch(error => {
        console.error(error);
    });
    };
  }
  const sendStatus = (senderName, senderMsg, time) => {
    if(session){
      session.signal({
        data: JSON.stringify({
            message: senderMsg, 
            sender: senderName,
            time: time,
        }),
        to: [],
        type: 'status'
    })
    .then(() => {
        console.log('Message successfully sent');
    })
    .catch(error => {
        console.error(error);
    });
    };
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = (status) => {
    setIsOpen(status);
  };

  console.log("===========>publisher", publisher);
  console.log("===========>subscribers", subscribers);

  return (
    <MeetingContext.Provider
      value={{
        sendChat,
        chatMessages,
        sendStatus,
        statusMessages,
        publisher,
        subscribers,
      }}
    >
      <PageContainer>
        <MeetingHeader title="내가 원하는 대로! 나만의 커스텀 향수 만들기 입문" />
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          loading={stepLoading}
          handleStartStep={handleStartStep}
          handleNextStep={handleNextStep}
          handleEndStep={handleEndStep}
        />
        <MainContent>
          <div>{text}</div>
          <ParticipantGrid>
          {visibleParticipants.map((participant, i) => {
            if (!participant) return null; // participant가 null인 경우 null을 반환하여 렌더링하지 않음

            return (
              <>
                {/* <span>{participant?.streamManager?.id || 'Publisher'}</span> */}
                <UserVideoComponent                 
                  key={i}
                  className="stream-container"
                  onClick={() => handleMainVideoStream(participant)}
                  style={{ flexBasis: getFlexBasis() }}
                  streamManager={participant} />
              </>
            );
          })}
          </ParticipantGrid>
          {(subscribers.length + 1) > maxVisible && (
            <>
              {currentIndex!==0 && <LeftScrollButton onClick={handlePrev} disabled={currentIndex === 0}>
                &lt;
              </LeftScrollButton>}
              {(currentIndex!==subscribers.length/maxVisible) && <RightScrollButton onClick={handleNext} disabled={(currentIndex + 1) * maxVisible >= (subscribers.length + 1)}>
                &gt;
              </RightScrollButton>}
            </>
          )}
        </MainContent>
        <MeetingFooter
          audioEnabled={audioEnabled}
          handleAudioEnabled={handleAudioEnabled}
          videoEnabled={videoEnabled}
          handleVideoEnabled={handleVideoEnabled}
          handleIsOpen={handleIsOpen} 
        />
      </PageContainer>
    </MeetingContext.Provider>
  );
}

export default MeetingPage;
