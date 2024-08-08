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

  const summaries = [
    {
      title: "1단계. 향수 기본 구성요소 설명",
      description:
        "이제 각 구성 요소인 탑 노트, 미들 노트, 베이스 노트가 무엇인지, 그리고 이들이 어떻게 함께 조화를 이루어 향수의 특성을 만들어내는지 살펴보겠습니다.",
    },
    {
      title: "2단계. 향수 샘플링 및 향의 특성 경험",
      description:
        "다양한 향료들을 직접 샘플링하며, 각 향료의 고유한 특성과 향수에 미치는 영향을 경험해보겠습니다. 여러분이 직접 향수를 만들어볼 때 이 지식들이 얼마나 중요한지 알게 될 겁니다.",
    },
    {
      title: "1단계. 향수 기본 구성요소 설명",
      description:
        "이제 각 구성 요소인 탑 노트, 미들 노트, 베이스 노트가 무엇인지, 그리고 이들이 어떻게 함께 조화를 이루어 향수의 특성을 만들어내는지 살펴보겠습니다.",
    },
    {
      title: "2단계. 향수 샘플링 및 향의 특성 경험",
      description:
        "다양한 향료들을 직접 샘플링하며, 각 향료의 고유한 특성과 향수에 미치는 영향을 경험해보겠습니다. 여러분이 직접 향수를 만들어볼 때 이 지식들이 얼마나 중요한지 알게 될 겁니다.",
    },
  ];

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
  }

  const closeContentWindow = () => {
    setIsContentWindow(false);
  }

  const openChatWindow = () => {
    setIsChatWindow(true);
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
          summaries={summaries}
        />
      )}
      {isChatWindow && <ChatWindow onCloseWindow={closeChatWindow} />}
    </>
  );
}

export default MeetingFooter;
