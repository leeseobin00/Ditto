import { useState } from "react";
import styled from "styled-components";

import MeetingHeader from "../../components/Meeting/MeetingHeader";
import ProgressBar from "../../components/Meeting/ProgressBar";
import MeetingFooter from "../../components/Meeting/MeetingFooter";
import TeacherParticipantGrid from "../../components/Meeting/TeacherParticipantGrid";
import StudentParticipantGrid from "../../components/Meeting/StudentParticipantGrid";

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

function MeetingPage() {
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
        <StudentParticipantGrid isOpen={isOpen} />
      </MainContent>
      <MeetingFooter handleIsOpen={handleIsOpen} />
    </PageContainer>
  );
}

export default MeetingPage;
