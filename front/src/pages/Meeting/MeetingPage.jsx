import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import MeetingHeader from '../../components/Meeting/MeetingHeader';
import ProgressBar from '../../components/Meeting/ProgressBar';
import MeetingFooter from "../../components/Meeting/MeetingFooter";

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

const stages = ["1단계. 향 조합 비율 결정하기", "2단계. 향기 선택하기", "3단계. 향 배합 비율 확인하기"];

const App = () => {
  const [currentStage, setCurrentStage] = useState(2); // Set initial stage
  const handleNextClick = () => {
    setCurrentStage((prevStage) => (prevStage + 1) % stages.length);
  };

  return (
    <PageContainer>
      <MeetingHeader title="내가 원하는 대로! 나만의 커스텀 향수 만들기 입문" />
      <ProgressBar stages={stages} currentStage={currentStage} handleNextClick={handleNextClick} />
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
      <MeetingFooter />
    </PageContainer>
  );
};

export default App;
