import 'regenerator-runtime/runtime';
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { OpenVidu } from 'openvidu-browser';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  max-height: calc(100vh - 200px);
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

function MeetingPage() {
  const userId = useSelector((state)=>state.auth.userId);
  const username = useSelector((state) => state.auth.nickname);
  const roleId = useSelector((state)=>state.auth.roleId);
  const navigate = useNavigate();
  const APPLICATION_SERVER_URL = "http://localhost:5000/";
  const [OV, setOV] = useState(undefined);
  const [isSession, setIsSession] = useState(undefined);
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState(undefined);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
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
    return () => {
      leaveSession();
    };
  }, []);

  useEffect(()=>{
    setMyUserName(username);
  },[username]);

  useEffect(() => {
    if (OV && myUserName && userId && roleId) {
      createSession();
    }
  }, [OV, myUserName, userId, roleId]);

  useEffect(()=>{
    if(!isSession) return;
    if(isSession===200){
      joinSession();
    }else{
      alert("세션에 접근할 수 없습니다!");
      navigate("/video");
    }
  },[isSession]);

  const getToken = async () => {
    // const sessionId = await createSession(mySessionId);
    // return await createToken(sessionId);
    return await createToken();
  };

  const createSession = async (sessionId) => {
    // const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
    //   headers: { 'Content-Type': 'application/json', },
    // });
    // return response.data; // The sessionId
    const response = await axios.post(`http://localhost:8080/sessions/36?userId=${userId}`, null);
    setIsSession(response?.data?.code);
  };

  const createToken = async () => {
    // const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
    //   headers: { 'Content-Type': 'application/json', },
    // });
    // return response.data; // The token
    const response = await axios.post(
      `http://localhost:8080/sessions/36/get-token?userId=${userId}`,
      null,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const token = response?.data?.data?.token;
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

  const joinSession = async () => {
    const newSession = OV.initSession();
    setSession(newSession);

    newSession.on('streamCreated', (event) => {
      if (event.stream.connection.connectionId !== newSession.connection.connectionId) {
        const subscriber = newSession.subscribe(event.stream, undefined);
        const parsedData = JSON.parse(subscriber?.stream?.connection?.data.split('%/%user-data')[0]);
        if (parsedData?.username !== myUserName) {
          setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
        }
      }
    });

    newSession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    newSession.on('exception', (exception) => {
      console.warn(exception);
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

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    setOV(null);
    setSession(undefined);
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
  }
  const handleNextStep = async () => {
    setStepLoading(true);
    setText(transcript);
    resetTranscript();
    setCurrentStep((prev) => prev + 1);
    setStepLoading(false);
  }
  const handleEndStep = () => {
    if (!listening) return;
    setStepLoading(true);
    setText(transcript);
    SpeechRecognition.abortListening();
    setStepLoading(false);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = (status) => {
    setIsOpen(status);
  };

  return (
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
            <div
              key={i}
              className="stream-container"
              onClick={() => handleMainVideoStream(participant)}
              style={{ flexBasis: getFlexBasis() }}
            >
              {/* <span>{participant?.streamManager?.id || 'Publisher'}</span> */}
              <UserVideoComponent streamManager={participant} />
            </div>
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
        handleIsOpen={handleIsOpen} />
    </PageContainer>
  );
}

export default MeetingPage;
