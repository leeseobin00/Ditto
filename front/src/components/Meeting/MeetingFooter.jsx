import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  BsClock,
  BsMic,
  BsCameraVideo,
  BsArrowsFullscreen,
  BsFileText,
  BsChatDots,
} from "react-icons/bs";

import TimerSetting from "./TimerWindow";
import ChatWindow from "./ChatWindow";
import ContentWindow from "./ContentWindow";
import { useSelector } from "react-redux";
import { MeetingContext } from "../../pages/Meeting/MeetingPage";

const Footer = styled.div`
  position: fixed; /* 화면의 고정 위치를 위해 fixed 사용 */
  bottom: 0; /* 바닥에 고정 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--MEETING_SECONDARY);
  width: 100%;
  height: 60px;
  padding: 12px 48px;
  z-index: 1;
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  min-width: 160px;
`;

const CustomClockIcon = styled(BsClock)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
  margin: 0px 16px;

  &:hover {
    color: var(--SECONDARY);
  }
`;

const CustomMicIcon = styled(({ isActive, ...props }) => <BsMic {...props} />)`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? "var(--RED)" : "var(--LIGHT)")};
  cursor: pointer;
  margin: 0px 16px;

  &:hover {
    color: var(--SECONDARY);
  }
`;

const CustomVideoIcon = styled(({ isActive, ...props }) => (
  <BsCameraVideo {...props} />
))`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? "var(--RED)" : "var(--LIGHT)")};
  cursor: pointer;
  margin: 0px 16px;

  &:hover {
    color: var(--SECONDARY);
  }
`;

const CustomScreenIcon = styled(BsArrowsFullscreen)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
  margin: 0px 16px;

  &:hover {
    color: var(--SECONDARY);
  }
`;

const CustomFiletextIcon = styled(BsFileText)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
  margin: 0px 16px;

  &:hover {
    color: var(--SECONDARY);
  }
`;

const CustomChatIcon = styled(BsChatDots)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
  margin: 0px 16px;

  &:hover {
    color: var(--SECONDARY);
  }
`;

const TimerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimerDisplay = styled.div`
  font-size: 24px;
  color: var(--SECONDARY);
`;

function MeetingFooter({ 
  audioEnabled, 
  handleAudioEnabled,
  videoEnabled,
  handleVideoEnabled,
  handleIsOpen }) {
  const username = useSelector((state)=>state.auth.username);
  const roleId = useSelector((state)=>state.auth.roleId);
  const { timer, sendTimer } = useContext(MeetingContext);

  const [isTimerWindow, setIsTimerWindow] = useState(false);
  const [isContentWindow, setIsContentWindow] = useState(false);
  const [isChatWindow, setIsChatWindow] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);

  const [inputMinute, setInputMinute] = useState(0);
  const [inputSecond, setInputSecond] = useState(0);

  const handleTimerWindow = () => {
    setIsTimerWindow((prev) => !prev);
  };

  const handleMicToggle = () => {
    setIsMicActive((prev) => !prev);
    handleAudioEnabled();
  };
  
  const handleVideoToggle = () => {
    setIsVideoActive((prev) => !prev);
    handleVideoEnabled();
  };

  useEffect(()=>{
    setIsMicActive(!audioEnabled);
    setIsVideoActive(!videoEnabled);
  },[audioEnabled, videoEnabled]);

  const openContentWindow = () => {
    setIsContentWindow(true);
    setIsChatWindow(false);
  }

  const closeContentWindow = () => {
    setIsContentWindow(false);
  }

  const openChatWindow = () => {
    setIsChatWindow(true);
    setIsContentWindow(false);
  }

  const closeChatWindow = () => {
    setIsChatWindow(false);
  }

  useEffect(() => {
    if (isChatWindow === true || isContentWindow === true) handleIsOpen(true);
    else handleIsOpen(false);
  }, [isChatWindow, isContentWindow]);

  const startTimer = () => {
    sendTimer(username, inputMinute, inputSecond);
    setIsTimerWindow(false);
  }

  return (
    <>
      <Footer>
        <FooterButtons>
          <TimerWrapper>
            {roleId==2 && (
              <>
              <CustomClockIcon onClick={handleTimerWindow} />
              {isTimerWindow && (
                <TimerSetting
                  title="타이머 설정"
                  inputMinute={inputMinute}
                  handleMinute={setInputMinute}
                  inputSecond={inputSecond}
                  handleSecond={setInputSecond}
                  handleStart={startTimer}
                  handleClose={handleTimerWindow}
                />
              )}
              </>
            )}
          </TimerWrapper>
          <TimerDisplay>{`${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`}</TimerDisplay>
        </FooterButtons>
        <FooterButtons>
          <CustomMicIcon isActive={isMicActive} onClick={handleMicToggle} />
          <CustomVideoIcon
            isActive={isVideoActive}
            onClick={handleVideoToggle}
          />
          {/* <CustomScreenIcon /> */}
        </FooterButtons>
        <FooterButtons>
          <CustomFiletextIcon onClick={openContentWindow} />
          <CustomChatIcon onClick={openChatWindow} />
        </FooterButtons>
      </Footer>
      {isContentWindow && (
        <ContentWindow
          onCloseWindow={closeContentWindow}
        />
      )}
      {isChatWindow && <ChatWindow onCloseWindow={closeChatWindow} />}
    </>
  );
}

export default MeetingFooter;
