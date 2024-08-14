import 'regenerator-runtime/runtime';
import { useEffect, useState, createContext, useRef } from "react";
import { styled } from "styled-components";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MeetingHeader from "../../components/Meeting/MeetingHeader";
import ProgressBar from "../../components/Meeting/ProgressBar";
import MeetingFooter from "../../components/Meeting/MeetingFooter";
import UserVideoComponent from '../../components/Meeting/UserVideoComponent';
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import Swal from 'sweetalert2';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--MEETING_BACKGROUND);
  color: var(--LIGHT);
  width: 100%;
  min-width: 1024px;
  height: 100vh;
`;

const MainContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.isopen == "true") ? "calc(100% - 400px)" : "100%"};
  height: calc(100% - 240px);
  margin-bottom: 16px;
`;

const ParticipantGrid = styled.div`
  display: flex;
  flex-wrap: nowrap; /* Do not wrap, enable horizontal scrolling */
  overflow-x: auto; /* Allow horizontal scroll */
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 100%;
  margin: 0px 32px;
`;

const ScrollButton = styled.button`
  background-color: var(--LIGHT);
  color: var(--DARK);
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 100%;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  &:hover{
    color: var(--SECONDARY);
  }
`;

const LeftScrollButton = styled(ScrollButton)`
  left: 10px;
`;

const RightScrollButton = styled(ScrollButton)`
  right: 10px;
`;

export const MeetingContext = createContext();

function MeetingPage() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const userId = useSelector((state)=>state.auth.userId);
  const username = useSelector((state) => state.auth.nickname);
  const roleId = useSelector((state)=>state.auth.roleId);
  const { lectureId } = useParams();
  const navigate = useNavigate();
  // axios
  const { sendRequest } = useAxios();
  // class
  const [className, setClassName] = useState("");
  const [stepList, setStepList] = useState([]);
  // openvidu state
  const [OV, setOV] = useState(undefined);
  const [isSession, setIsSession] = useState(undefined);   // 현재 createSession 응답을 저장해서 강사가 미리 세션을 만든 경우가 아니면 다시 내강의실로 navigate되도록 구현
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState(undefined);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  // meeting에 참여하는 멤버들 이름
  const [members, setMembers] = useState([]);
  // chat, timer
  const [chatMessages, setChatMessages] = useState([]);
  const [statusMessages, setStatusMessages] = useState([]);
  //const [statusMessages, setStatusMessages] = useState(new Map());
  const [timer, setTimer] = useState(0); // Set initial timer value to 60 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // 음소거, 화면끄기
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  // pagination
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisible = 3; // Maximum visible participants
  // summary
  const [summaries, setSummaries] = useState([]);
  // isOut
  const [isEnd, setEnd] = useState(false);

  useEffect(()=>{
    if(isEnd && subscribers.length==0){
      navigate("/video");
    }
  },[isEnd, subscribers]);

  const getLectureInfo = async() => {
    const result = await sendRequest(`/live-rooms/${lectureId}`);
    setClassName(result?.data?.className);
    setStepList(result?.data?.stepList);
    return result;
  }
  
  const getSummary = async() => {
    const result = await sendRequest(`/summary/${lectureId}`);
    setSummaries(result?.data);
  }

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
    getLectureInfo();
  }, []);

  useEffect(()=>{
    setMyUserName(username);
  },[username]);

  useEffect(() => {
    if (OV && myUserName && userId && roleId && lectureId) {
      // TODO: 토큰 자동 생성 구현 후에 roleId에 관계없이 joinSession으로 통합예정
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
    const response = await axios.post(`${baseURL}/sessions/${lectureId}?userId=${userId}`, null);
    if(response?.data?.code==200 || response?.data?.code==400){
      Swal.fire({
        title: '세션에 성공적으로 접속했습니다!',
        icon: 'success',
        confirmButtonText: '확인',
        confirmButtonColor: "#FF7F50",
      });
      joinSession();
    }else{
      Swal.fire({
        title: '세션에 접근할 수 없습니다!',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: "#FF7F50",
      });
      navigate("/video");
    }
  };

  const getToken = async () => {
    return await createToken();
  };

  const createToken = async () => {
    try {
      const response = await axios.post(`${baseURL}/sessions/${lectureId}/get-token?userId=${userId}`, null, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response?.data?.code === 403) {
        await Swal.fire({
          title: '오류 발생!',
          text: response?.data?.message || '권한이 없습니다.',
          icon: 'error',
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
        navigate("/video");
        return;
      }
  
      if (response?.data?.code === 'SESSION_NOT_FOUND') {
        await Swal.fire({
          title: '세션 오류!',
          text: response?.data?.message || '세션을 찾을 수 없습니다.',
          icon: 'error',
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
        navigate("/video");
        return;
      }
  
      const token = response?.data?.data;
      return token;
    } catch (error) {
      await Swal.fire({
        title: '알림',
        text: '접속 토큰 생성 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
      navigate("/video");
    }
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

  const joinSession = async () => {
    const newSession = OV.initSession();
    setSession(newSession);

    newSession.on('streamCreated', (event) => {
      const connectionData = event.stream.connection;
      const parsedData = JSON.parse(connectionData?.data.split('%/%user-data')[0]);
      if(connectionData.connectionId == newSession.connection.connectionId) return;
      
      // 수강생이면 강사만 subscribe할 수 있음
      if(roleId==1 && parsedData?.roleId==1) return;
      const subscriber = newSession.subscribe(event.stream, undefined);
      if (parsedData?.username !== myUserName) {
        setMembers((prev)=>[...prev, parsedData?.username]);
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      }
    });

    newSession.on('streamDestroyed', (event) => {
      if(visibleParticipants.length==1){
        setCurrentIndex((prev)=>Math.max(prev - 1, 0));
      }
      deleteSubscriber(event.stream.streamManager);
    });

    newSession.on('exception', (exception) => {
      console.warn(exception);
    });

    newSession.on('signal:chat', (event) => {
      const parsedData = JSON.parse(event.data);
      // 이벤트 수신시 로직
      if(parsedData?.target=="모두에게" || parsedData?.target==username || parsedData?.sender==username){
        setChatMessages((prev)=>[...prev, parsedData]);
      }
    });

    newSession.on('signal:status', (event) => {
      const parsedData = JSON.parse(event.data);
      setStatusMessages((prevMessages)=>{
        let isExist = false;
        const newStatusMessages = prevMessages.filter((message) => {
          if (message?.sender !== parsedData?.sender) {
            return true;
          } else {
            isExist = true;
            return false;
          }
        });
    
        return [...newStatusMessages, parsedData];
      })    
    });

    newSession.on('signal:timer', (event) => {
      const parsedData = JSON.parse(event.data);
      // 이벤트 수신시 로직
      startTimer(parsedData?.minute, parsedData?.second);
    });

    newSession.on('signal:progress', (event) => {
      const parsedData = JSON.parse(event.data);
      // 이벤트 수신시 로직
      setCurrentStep(parsedData?.curProgress);
      setStatusMessages([]);
    });

    newSession.on('signal:end', (event) => {
      if(roleId==1){
        navigate("/video");
      }else if(roleId==2){
        setEnd(true);
      }
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
      // TODO: 자동화 구현 후 코드 삭제 예정
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
    if(isEnd) { navigate("/video"); }
  };

  // Include publisher in pagination logic 
  const [visibleParticipants, setVisibleParticipants]  = useState([]);
  useEffect(()=>{
    if(roleId==1){
      setVisibleParticipants([...subscribers, publisher].slice(currentIndex * maxVisible, (currentIndex + 1) * maxVisible));
    }else if(roleId==2){
      setVisibleParticipants([publisher,...subscribers].slice(currentIndex * maxVisible, (currentIndex + 1) * maxVisible));
    }
  },[currentIndex, publisher, subscribers]);

  //const visibleParticipants = roleId == 1 ? [...subscribers, publisher].slice(currentIndex * maxVisible, (currentIndex + 1) * maxVisible) : [publisher,...subscribers].slice(currentIndex * maxVisible, (currentIndex + 1) * maxVisible);
  // Calculate flex-basis based on the number of visible participants
  const getFlexBasis = () => {
    return `calc(${100 / Math.min(subscribers.length + 1, maxVisible)}% - 16px)`;
  };

  // pagination을 위한 함수
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, Math.ceil((subscribers.length + 1) / maxVisible) - 1));
  };

  // STT /////////////////////////////////////////////////////////////////////////////////////////////////////
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepLoading, setStepLoading] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [text, setText] = useState();
  const handleStartStep = () => {
    setStepLoading(true);
    SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
    sendProgress(username, currentStep+1);
    setCurrentStep((prev) => prev + 1);
    setStepLoading(false);
    setStatusMessages([]);
  }
  const handleNextStep = async () => {
    setStepLoading(true);
    setText(transcript);
    const sendText = transcript;
    // TODO: await를 해야하지만... duplicate key가 안되서 어찌하지..
    axios.post(`${baseURL}/summary/${lectureId}/${stepList[currentStep]?.stepId}`, {"originText": sendText});
    resetTranscript();
    sendProgress(username, currentStep+1);
    setCurrentStep((prev) => prev + 1);
    setStepLoading(false);
    setStatusMessages([]);
  }
  const handleEndStep = async() => {
    if (!listening) return;
    if(currentStep>=stepList.length) return;
    setStepLoading(true);
    setText(transcript);
    const sendText = transcript;
    // TODO: await를 해야하지만... duplicate key가 안되서 어찌하지..
    axios.post(`${baseURL}/summary/${lectureId}/${stepList[currentStep]?.stepId}`, {"originText": sendText});
    resetTranscript();
    sendProgress(username, currentStep+1);
    setCurrentStep((prev) => prev + 1);
    setStepLoading(false);
    SpeechRecognition.abortListening();
    setStepLoading(false);
    setStatusMessages([]);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // event: chat, status, timer, progress////////////////////////////////////////////////////////////////////////
  const sendChat = (senderName, senderMsg, time, target) => {
    if(session){
      session.signal({
        data: JSON.stringify({
            message: senderMsg, 
            sender: senderName,
            time: time,
            target: target,
        }),
        to: [],
        type: 'chat'
    })
    .then(() => {
        console.log('Message successfully sent: chat');
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
        console.log('Message successfully sent: status');
    })
    .catch(error => {
        console.error(error);
    });
    };
  }
  const sendTimer = (senderName, minute, second) => {
    if(session){
      session.signal({
        data: JSON.stringify({
            sender: senderName,
            minute: minute, 
            second: second,
        }),
        to: [],
        type: 'timer'
    })
    .then(() => {
        console.log('Message successfully sent: timer');
    })
    .catch(error => {
        console.error(error);
    });
    };
  }
  useEffect(() => {
    let timerInterval;
    if (isTimerRunning && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timer]);
  const startTimer = (minute, second) => {
    setTimer(minute * 60 + second);
    setIsTimerRunning(true);
  };
  const sendProgress = (senderName, curProgress) => {
    if(session){
      session.signal({
        data: JSON.stringify({
            sender: senderName,
            curProgress: curProgress,
        }),
        to: [],
        type: 'progress'
    })
    .then(() => {
        console.log('Message successfully sent: progress');
    })
    .catch(error => {
        console.error(error);
    });
    };
  }
  const sendEnd = (senderName) => {
    if(session){
      session.signal({
        data: JSON.stringify({
            sender: senderName,
        }),
        to: [],
        type: 'end'
    })
    .then(() => {
        console.log('Message successfully sent: end');
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

  return (
    <MeetingContext.Provider
      value={{
        sendChat,
        chatMessages,
        sendStatus,
        statusMessages,
        sendEnd,
        publisher,
        subscribers,
        timer,
        sendTimer,
        members,
        getSummary,
        summaries
      }}
    >
      <PageContainer>
        <MeetingHeader title={className} />
        <ProgressBar
          steps={stepList}
          currentStep={currentStep}
          loading={stepLoading}
          handleStartStep={handleStartStep}
          handleNextStep={handleNextStep}
          handleEndStep={handleEndStep}
        />
        <MainContent isopen={isOpen.toString()}>
          <ParticipantGrid>
          {visibleParticipants.map((participant, i) => {
            if (!participant) return null; // participant가 null인 경우 null을 반환하여 렌더링하지 않음
            if (roleId==1 && (participant?.stream?.connection?.data?.split('%/%user-data')[0])?.roleId==1) {
              return;
            }
            return (
              <UserVideoComponent                 
                key={i}
                className="stream-container"
                onClick={() => handleMainVideoStream(participant)}
                streamManager={participant} />
            );
          })}
          </ParticipantGrid>
          <>
              {currentIndex!==0 && <LeftScrollButton onClick={handlePrev} disabled={currentIndex === 0}>
                &lt;
              </LeftScrollButton>}
              {(currentIndex<Math.floor(subscribers.length/maxVisible)) && <RightScrollButton onClick={handleNext} disabled={(currentIndex + 1) * maxVisible >= (subscribers.length + 1)}>
                &gt;
              </RightScrollButton>}
          </>
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
