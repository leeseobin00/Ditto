import { styled } from "styled-components";

import Participant from "./Participant";

const ParticipantGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding-bottom: 80px;
`;

const ParticipantContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;
`;

function TeacherParticipantGrid() {
  return (
    <ParticipantGrid>
      <ParticipantContainer>
        <Participant name="한싸피" imgSrc="/mnt/data/image.png" isInstructor />
      </ParticipantContainer>
      <ParticipantContainer>
        <Participant name="김싸피" imgSrc="/mnt/data/image.png" isHelp={true} />
      </ParticipantContainer>
      <ParticipantContainer>
        <Participant name="전싸피" imgSrc="/mnt/data/image.png" isHighlighted />
      </ParticipantContainer>
      <ParticipantContainer>
        <Participant name="한싸피" imgSrc="/mnt/data/image.png" isInstructor />
      </ParticipantContainer>
      <ParticipantContainer>
        <Participant name="김싸피" imgSrc="/mnt/data/image.png" isHelp={true} />
      </ParticipantContainer>
      <ParticipantContainer>
        <Participant name="전싸피" imgSrc="/mnt/data/image.png" isHighlighted />
      </ParticipantContainer>
      <ParticipantContainer>
        <Participant name="한싸피" imgSrc="/mnt/data/image.png" isInstructor />
      </ParticipantContainer>
      <ParticipantContainer>
        <Participant name="김싸피" imgSrc="/mnt/data/image.png" isHelp={true} />
      </ParticipantContainer>
      <ParticipantContainer>
        <Participant name="전싸피" imgSrc="/mnt/data/image.png" isHighlighted />
      </ParticipantContainer>
    </ParticipantGrid>
  );
}

export default TeacherParticipantGrid;
