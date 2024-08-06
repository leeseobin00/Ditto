import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { MeetingContext } from '../../pages/Meeting/MeetingPage';

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px; /* Optional: ensure border-radius is applied */
`;

const Video = styled.video`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border: 3px solid ${({ status }) => {
    if (status === 'help') return 'red';
    if (status === 'done') return 'green';
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
  white-space: nowrap;
`;


function UserVideoComponent({ streamManager }) {
  const roleId = useSelector((state) => state.auth.roleId);
  const username = useSelector((state) => state.auth.nickname);
  // context API
  const { statusMessages, sendStatus } = useContext(MeetingContext);

  const videoRef = useRef(null);
  const [videoRoleId, setVideoRoleId] = useState(undefined);
  const [myStatus, setMyStatus] = useState("normal");

  const onHelp = () => {
    sendStatus(username, '도와주세요');
  };

  const onDone = () => {
    sendStatus(username, '완료');
  };

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
      try{
        const parsedData = JSON.parse(
            streamManager?.session?.connection?.data.split('%/%user-data')[0]
        );
        console.log("===>parsedData: ", parsedData);
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

  useEffect(() => {
    const videoUsername = getNicknameTag();
    if(statusMessages.length===0) setMyStatus("normal");
    const matchingMessages = statusMessages.filter(
      (message) => message.sender === videoUsername
    );
    matchingMessages.forEach((message) => {
      if (message.message === "normal") setMyStatus("normal");
      if (message.message === "도와주세요") setMyStatus("help");
      if (message.message === "완료") setMyStatus("done");
    });
  }, [statusMessages]);

  console.log(myStatus);
  console.log(statusMessages);

  return (
    <div>
      {streamManager !== undefined ? (
        <VideoWrapper>
          <Video status={myStatus} autoPlay={true} ref={videoRef} />
          <NameTag>{getNicknameTag()}</NameTag>
          {(roleId==1 && videoRoleId==1) && <ButtonsWrapper>
            <Button onClick={onHelp}>도움이 필요해요</Button>
            <Button onClick={onDone}>단계를 완료했어요</Button>
          </ButtonsWrapper>}
        </VideoWrapper>
      ) : null}
    </div>
  );
}

export default UserVideoComponent;
