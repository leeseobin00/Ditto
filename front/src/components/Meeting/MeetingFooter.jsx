import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsClock, BsMic, BsCameraVideo, BsArrowsFullscreen, BsFileText, BsChatDots } from 'react-icons/bs';

import TimerSetting from "./TimerSetting";
import ChatWindow from "./ChatWindow";
import FileWindow from "./FileWindow";

const Footer = styled.div`
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--MEETING_BAR);
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
`;

const CustomMicIcon = styled(BsMic)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
  margin: 0px 16px;
`;

const CustomVideoIcon = styled(BsCameraVideo)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
  margin: 0px 16px;
`;

const CustomScreenIcon = styled(BsArrowsFullscreen)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
  margin: 0px 16px;
`;

const CustomFiletextIcon = styled(BsFileText)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
  margin: 0px 16px;
`;

const CustomChatIcon = styled(BsChatDots)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
  margin: 0px 16px;
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

function MeetingFooter() {
  const [isTimerSettingVisible, setIsTimerSettingVisible] = useState(false);
  
  const [inputMinutes, setInputMinutes] = useState(1);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [timer, setTimer] = useState(60); // Set initial timer value to 60 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isChatVisible, setChatVisible] = useState(false);
  const [isFileVisible, setFileVisible] = useState(false);

  const toggleChat = () => {
    setChatVisible((prevVisible) => !prevVisible);
  };

  const toggleFile = () => {
    setFileVisible((prevVisible) => !prevVisible);
  };

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

  const startTimer = () => {
    setTimer(inputMinutes * 60 + inputSeconds);
    setIsTimerRunning(true);
    setIsTimerSettingVisible(false);
  };

  const handleTimerVisible = () => {
    setIsTimerSettingVisible((prev) => !prev);
  };

  return (
    <>
      <Footer>
        <FooterButtons>
          <TimerWrapper>
            <CustomClockIcon onClick={handleTimerVisible} />
            {isTimerSettingVisible && (
              <TimerSetting title="타이머 설정" handleMinute={setInputMinutes} handleSecond={setInputSeconds} handleStart={startTimer} handleCancel={handleTimerVisible} />
            )}
          </TimerWrapper>
          <TimerDisplay>{`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`}</TimerDisplay>
        </FooterButtons>
        <FooterButtons>
          <CustomMicIcon />
          <CustomVideoIcon />
          <CustomScreenIcon />
        </FooterButtons>
        <FooterButtons>
          <CustomFiletextIcon onClick={toggleFile} />
          <CustomChatIcon onClick={toggleChat} />
        </FooterButtons>
      </Footer>
      {isChatVisible && <ChatWindow toggleChat={toggleChat} />}
      {isFileVisible && <FileWindow toggleFile={toggleFile} />}
    </>
  );
}

export default MeetingFooter;
