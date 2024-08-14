import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { MeetingContext } from '../../pages/Meeting/MeetingPage';

const VideoWrapper = styled.div`
  position: relative;
  height: auto;
  max-height: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 8px; /* Optional: ensure border-radius is applied */
`;

const Video = styled.video`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border: 3px solid ${({ videoroleid, status }) => {
    if (videoroleid==1 && status === 'help') return "var(--RED)";
    if (videoroleid==1 && status === 'done') return "var(--GREEN)";
    return 'transparent'; // or another color for 'normal'
  }};
`;

const NameTag = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  display: flex;
  gap: 24px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: var(--LIGHT);
  white-space: nowrap;
`;

const HelpButton = styled(Button)`
  background-color: var(--RED);
`;

const CompleteButton = styled(Button)`
  background-color: var(--GREEN);
`;

function UserVideoComponent({ streamManager }) {
  const roleId = useSelector((state) => state.auth.roleId);
  const username = useSelector((state) => state.auth.nickname);
  // context API
  const { statusMessages, sendStatus, members } = useContext(MeetingContext);

  const videoRef = useRef(null);
  const [videoRoleId, setVideoRoleId] = useState(undefined);
  const [myStatus, setMyStatus] = useState("normal");
  const [isHelp, setIsHelp] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const onHelp = () => {
    if(isHelp==false){
      setIsHelp(true);
      setIsDone(false);
      sendStatus(username, 'help');
    }else if(isHelp==true){
      setIsHelp(false);
      setIsDone(false);
      sendStatus(username, 'normal');
    }
  };

  const onDone = () => {
    if(isDone==false){
      setIsDone(true);
      setIsHelp(false);
      sendStatus(username, 'done');
    }else if(isDone==true){
      setIsHelp(false);
      setIsDone(false);
      sendStatus(username, 'normal');
    }
  };

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
      try{
        const parsedData = JSON.parse(
            streamManager?.session?.connection?.data.split('%/%user-data')[0]
        );
        setVideoRoleId(parsedData?.roleId);
      }catch(error){
        console.log(error);
      }
    }
  }, [streamManager]);

  const getNicknameTag = () => {
    const parsedData = JSON.parse(
      streamManager?.stream?.connection?.data.split('%/%user-data')[0]
    );
    return parsedData?.username;
  };

  const getRoleId = () => {
    const parsedData = JSON.parse(
      streamManager?.stream?.connection?.data.split('%/%user-data')[0]
    );
    return parsedData?.roleId;
  };

  useEffect(() => {
    const videoUsername = getNicknameTag();
    if(statusMessages.length===0) setMyStatus("normal");
    const matchingMessages = statusMessages.filter(
      (message) => message.sender === videoUsername
    );

    matchingMessages.forEach((message) => {
      setMyStatus(message.message);
    });
  }, [statusMessages, streamManager]);

  return (
    <>
      {streamManager !== undefined ? (
        <VideoWrapper>
          <Video videoroleid={getRoleId()} status={myStatus} autoPlay={true} ref={videoRef} />
          <NameTag>{getNicknameTag()}</NameTag>
          {(roleId==1 && getRoleId()==1) && <ButtonsWrapper>
            <HelpButton onClick={onHelp}>도움이 필요해요</HelpButton>
            <CompleteButton onClick={onDone}>단계를 완료했어요</CompleteButton>
          </ButtonsWrapper>}
        </VideoWrapper>
      ) : null}
    </>
  );
}

export default UserVideoComponent;
