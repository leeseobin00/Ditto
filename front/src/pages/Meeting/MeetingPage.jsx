import { useEffect, useState } from "react";
import {
  LocalVideoTrack,
  LocalAudioTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent
} from "livekit-client";
import { styled } from "styled-components";

import usewebRTCAxios from "../../hooks/usewebRTCAxios";
import MeetingHeader from "../../components/Meeting/MeetingHeader";
import ProgressBar from "../../components/Meeting/ProgressBar";
import MeetingFooter from "../../components/Meeting/MeetingFooter";
import AudioComponent from "../../components/Meeting/AudioComponent";
import VideoComponent from "../../components/Meeting/VideoComponent";
import { MdJoinRight } from "react-icons/md";

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
  // State for user name
  const [userName, setUserName] = useState(undefined);
  // axios
  const { sendRequest: getToken } = usewebRTCAxios();
  // webRTC
  const [room, setRoom] = useState(undefined);
  const [localVideoTrack, setLocalVideoTrack] = useState(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined);
  const [remoteTracks, setRemoteTracks] = useState([]);

  // State for mute and video control
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const handleAudioEnabled = () => {
    setAudioEnabled((prevEnabled) => {
      if (localAudioTrack) {
        if (prevEnabled) {
          localAudioTrack.mute();
        } else {
          localAudioTrack.unmute();
        }
      }
      return !prevEnabled;
    });
  };

  const handleVideoEnabled = () => {
    setVideoEnabled((prevEnabled) => {
      if (localVideoTrack) {
        if (prevEnabled) {
          localVideoTrack.mute();
        } else {
          localVideoTrack.unmute();
        }
      }
      return !prevEnabled;
    });
  };

  const handleGetToken = async () => {
    const postData = {
      roomName: "A106",
      participantName: userName,
    };
    const result = await getToken("/token", postData, "post");
    return result?.token;
  };

  async function joinRoom() {
    const room = new Room();
    setRoom(room);
    const token = await handleGetToken();
    
    room.on(RoomEvent.TrackSubscribed, (_track, publication, participant) => {
      setRemoteTracks((prev) => [
        ...prev,
        { trackPublication: publication, participantIdentity: participant.identity }
      ]);
    });
    room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
      setRemoteTracks((prev) => prev.filter((track) => track.trackPublication.trackSid !== publication.trackSid));
    });

    try {
      await room.connect("ws://localhost:7880/", token);
      await room.localParticipant.enableCameraAndMicrophone();
      const videoTrack = room.localParticipant.videoTrackPublications.values().next().value.videoTrack;
      const audioTrack = room.localParticipant.audioTrackPublications.values().next().value.audioTrack;
      setLocalVideoTrack(videoTrack);
      setLocalAudioTrack(audioTrack);
    } catch (error) {
      console.log("There was an error connecting to the room:", error.message);
      await leaveRoom();
    }
  }

  const leaveRoom = async () => {
    await room?.disconnect();
    setRoom(undefined);
    setLocalVideoTrack(undefined);
    setLocalAudioTrack(undefined);
    setRemoteTracks([]);
  };

  useEffect(()=>{
    if(!userName){
      const inputName = prompt("이름 입력: ");
      setUserName(inputName);
    }
  },[]);
  
  useEffect(()=>{
    if(userName){
      joinRoom();
    }
  },[userName]);

  ///////////////////////////////////////////////////////////////
  const stages = [
    "1단계. 향 조합 비율 결정하기",
    "2단계. 향기 선택하기",
    "3단계. 향 배합 비율 확인하기",
  ];
  const [currentStage, setCurrentStage] = useState(-1); // Set initial stage
  const handleNextStage = () => {
    setCurrentStage((prevStage) => prevStage + 1);
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = (status) => {
    setIsOpen(status);
  };

  return (
    <PageContainer>
      <MeetingHeader title="내가 원하는 대로! 나만의 커스텀 향수 만들기 입문" />
      <ProgressBar
        stages={stages}
        currentStage={currentStage}
        handleNextStage={handleNextStage}
      />
      <MainContent>
        {room && <ParticipantGrid>
          {localVideoTrack && (
            <VideoComponent 
              track={localVideoTrack} 
              participantIdentity={userName} 
              local={true}
              videoEnabled={videoEnabled}  
            />
          )}
          {remoteTracks.map((remoteTrack) =>
            remoteTrack.trackPublication.kind === "video" ? (
              <VideoComponent
                key={remoteTrack.trackPublication.trackSid}
                track={remoteTrack.trackPublication.videoTrack}
                participantIdentity={remoteTrack.participantIdentity}
                videoEnabled={true}
              />
            ) : (
              <AudioComponent
                key={remoteTrack.trackPublication.trackSid}
                track={remoteTrack.trackPublication.audioTrack}
              />
            )
          )}
        </ParticipantGrid>}
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
