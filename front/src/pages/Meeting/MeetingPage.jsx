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
  align-items: center;
  background-color: var(--MEETING_BACKGROUND);
  color: #fff;
  min-width: 1024px;
  min-height: 100vh;
  position: relative;
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

  return (
    <PageContainer>
      <MeetingHeader title="내가 원하는 대로! 나만의 커스텀 향수 만들기 입문" />
      <ProgressBar
        stages={stages}
        currentStage={currentStage}
        handleNextStage={handleNextStage}
      />
      <MainContent>
        <StudentParticipantGrid />
      </MainContent>
      <MeetingFooter />
    </PageContainer>
  );
}

export default MeetingPage;
