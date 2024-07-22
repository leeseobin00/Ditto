import { useState } from 'react';
import styled from 'styled-components';
import { BsClock, BsMic, BsCameraVideo, BsArrowsFullscreen, BsFileText, BsChatDots } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

// Container for the entire page
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2d2d2d;
  color: #fff;
  min-width: 1024px;
  min-height: 100vh;
  position: relative;
`;

// Header section
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;  
  width: 100%;
  height: 60px;
  background-color: #444;
  padding: 24px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--SECONDARY);
  font-size: 18px;
`;

const LiveIndicator = styled.p`
  background-color: var(--RED);
  color: var(--LIGHT);
  padding: 4px 8px;
  margin-left: 16px;
  border-radius: 4px;
  font-size: 12px;
`;

const IconWrapper = styled.div`
`;

const CustomOutIcon = styled(BiLogOut)`
  font-size: 24px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
`;

const CustomClockIcon = styled(BsClock)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
`;

const CustomMicIcon = styled(BsMic)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
`;

const CustomVideoIcon = styled(BsCameraVideo)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
`;

const CustomScreenIcon = styled(BsArrowsFullscreen)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
`;

const CustomFiletextIcon = styled(BsFileText)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
`

const CustomChatIcon = styled(BsChatDots)`
  font-size: 20px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
`

// Progress bar container
const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 80px;
  padding: 16px 24px;
`;

const Progress = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ProgressDescription = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const StageName = styled.div`
  color: var(--LIGHT);
  font-size: 18px;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
`;

const Box = styled.div`
  flex: 1;
  height: 12px;
  background-color: ${(props) => (props.filled ? "var(--GREEN)" : "var(--LIGHT)")};
  border-radius: 2px;
`;

const NextButton = styled.button`
  background-color: #444;
  color: var(--SECONDARY);
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
`;

// Main content area
const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

// Participant grid
const ParticipantGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 80%;
`;

// Individual participant tile
const ParticipantTile = styled.div`
  background-color: #3a3a3a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  aspect-ratio: 4/3;
  position: relative;
  
  &.active {
    border: 2px solid green;
  }
  
  &.highlighted {
    border: 2px solid red;
  }
`;

const UserIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #666;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
`;

// Footer section with buttons
const Footer = styled.div`
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #444;
  width: 100%;
  height: 60px;
  padding: 12px 48px;
  z-index: 1;
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;
  min-width: 100px;
`;

const FooterButton = styled.button`
  background: none;
  border: none;
  color: var(--LIGHT);
  font-size: 32px;
  cursor: pointer;

  &:hover {
    color: var(--SECONDARY);
  }
`;

// Chat window
const ChatWindow = styled.div`
  position: absolute;
  right: 24px;
  top: calc(60px + 80px + 16px);
  width: 360px;
  height: calc(100% - 60px - 80px - 16px - 60px);
  background-color: #333;
  border-left: 2px solid #444;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  z-index: 2000;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #444;
  color: white;
  border-bottom: 1px solid #555;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 8px;
  overflow-y: auto;
`;

const ChatInput = styled.div`
  display: flex;
  border-top: 1px solid #555;
  padding: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px;
  margin-right: 8px;
  outline: none;
`;

const SendButton = styled.button`
  background-color: #555;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
`;

const stages = ["1단계. 향 조합 비율 결정하기", "2단계. 향기 선택하기", "3단계. 향 배합 비율 확인하기"];

const ProgressBar = ({ currentStage, handleNextClick }) => {
  return (
    <ProgressBarContainer>
      <Progress>
        <Bar>
          {stages.map((_, index) => (
            <Box key={index} filled={index <= currentStage} />
          ))}
        </Bar>
      </Progress>
      <ProgressDescription>
      <StageName>{stages[currentStage]}</StageName>
      <NextButton onClick={handleNextClick}>Next</NextButton>
      </ProgressDescription>
    </ProgressBarContainer>
  );
};

const App = () => {
  const [currentStage, setCurrentStage] = useState(2); // Set initial stage
  const [isChatVisible, setChatVisible] = useState(false);

  const handleNextClick = () => {
    setCurrentStage((prevStage) => (prevStage + 1) % stages.length);
  };

  const toggleChat = () => {
    setChatVisible((prevVisible) => !prevVisible);
  };

  return (
    <PageContainer>
      <Header>
        <TitleWrapper>
          내가 원하는 대로! 나만의 커스텀 향수 만들기 입문
          <LiveIndicator>● LIVE</LiveIndicator>
        </TitleWrapper>
        <IconWrapper>
          <CustomOutIcon />
        </IconWrapper>
      </Header>
      <ProgressBar currentStage={currentStage} handleNextClick={handleNextClick} />
      <MainContent>
        <ParticipantGrid>
          <ParticipantTile>
            <UserIcon>👤</UserIcon>
          </ParticipantTile>
          <ParticipantTile className="active">
            <UserIcon>👤</UserIcon>
          </ParticipantTile>
          {/* Add more ParticipantTile components as needed */}
          <ParticipantTile className="highlighted">
            <UserIcon>👤</UserIcon>
          </ParticipantTile>
        </ParticipantGrid>
      </MainContent>
      <Footer>
        <FooterButtons>
          <FooterButton>
            <CustomClockIcon />
          </FooterButton>
        </FooterButtons>
        <FooterButtons>
          <FooterButton>
            <CustomMicIcon />
          </FooterButton>
          <FooterButton>
            <CustomVideoIcon />
          </FooterButton>
          <FooterButton>
            <CustomScreenIcon />
          </FooterButton>
        </FooterButtons>
        <FooterButtons>
          <FooterButton>
            <CustomFiletextIcon />
          </FooterButton>
          <FooterButton onClick={toggleChat}>
            <CustomChatIcon />
        </FooterButton>
        </FooterButtons>
      </Footer>
      <ChatWindow visible={isChatVisible}>
        <ChatHeader>
          <span>Chat</span>
          <IoClose onClick={toggleChat} style={{ cursor: 'pointer' }} />
        </ChatHeader>
        <ChatMessages>
          {/* Add chat messages here */}
        </ChatMessages>
        <ChatInput>
          <Input type="text" placeholder="메시지 입력..." />
          <SendButton>Send</SendButton>
        </ChatInput>
      </ChatWindow>
    </PageContainer>
  );
};

export default App;
