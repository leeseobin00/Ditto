import 'regenerator-runtime/runtime';
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { OpenVidu } from 'openvidu-browser';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MeetingHeader from "../../components/Meeting/MeetingHeader";
import ProgressBar from "../../components/Meeting/ProgressBar";
import MeetingFooter from "../../components/Meeting/MeetingFooter";
import axios from "axios";
import UserVideoComponent from '../../components/Meeting/UserVideoComponent';
import { useSelector } from 'react-redux';

// Container for the entire page
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--MEETING_BACKGROUND);
  color: var(--LIGHT);
  width: 100%;
  min-width: 1024px;
  height: 100%;
  min-height: 100vh;
`;

// Main content area
const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 16px;
`;

const ParticipantGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding-bottom: 80px;
`;

function MeetingPage() {
  const username = useSelector((state)=>state.auth.nickname);
  const APPLICATION_SERVER_URL = "http://localhost:5000/";
  const [OV, setOV] = useState(undefined);
  const [mySessionId, setMySessionId] = useState('SessionA');
  const [myUserName, setMyUserName] = useState(undefined);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  // State for mute and video control
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  // New functions for toggling audio and video
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

  useEffect(()=>{
    const name = prompt("이름: ");
    setMyUserName(name);
    setOV(new OpenVidu());
    return () => {
      leaveSession();
    };
  },[]);

  useEffect(()=>{
    if(OV && myUserName){
      joinSession();
    }
  },[OV, myUserName]);

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
      const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
          headers: { 'Content-Type': 'application/json', },
      });
      return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
      const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
          headers: { 'Content-Type': 'application/json', },
      });
      return response.data; // The token
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

  const joinSession = async() => {
    const newSession = OV.initSession();
    setSession(newSession);

    newSession.on('streamCreated', (event) => {
      // 발행자의 스트림인지 확인
      if (event.stream.connection.connectionId !== newSession.connection.connectionId) {
        const subscriber = newSession.subscribe(event.stream, undefined);
        const parsedData = JSON.parse(subscriber?.stream?.connection?.data);
        if(parsedData?.clientData!==myUserName){
          console.log("구독");
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

    newSession.connect(token, { clientData: myUserName })
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

        const devices = await OV.getDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const currentVideoDeviceId = newPublisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
        const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

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

  // STT /////////////////////////////////////////////////////////////////////////////////////////////////////
  // 1. step을 불러온다.
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
    setCurrentStep((prev) => prev+1);
    setStepLoading(false);
  }
  const handleNextStep = async() => {
    setStepLoading(true);
    setText(transcript);
    resetTranscript();
    setCurrentStep((prev) => prev+1);
    setStepLoading(false);
  }
  const handleEndStep = () => {
    if(!listening) return;
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

  console.log(publisher);
  console.log(subscribers);
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
        {mainStreamManager !== undefined ? (
          <div id="main-video" className="col-md-6">
            <UserVideoComponent streamManager={mainStreamManager} />
          </div>
        ) : null}
        {publisher !== undefined ? (
            <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(publisher)}>
                <UserVideoComponent
                    streamManager={publisher} />
            </div>
        ) : null}
        {subscribers.map((sub, i) => (
            <div key={i} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
            </div>
        ))}
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
