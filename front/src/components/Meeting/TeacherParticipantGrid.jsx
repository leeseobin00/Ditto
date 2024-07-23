import { styled } from "styled-components";

import Participant from "./Participant";

const ParticipantGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 80%;
`;

function TeacherParticipantGrid() {
  return (
    <ParticipantGrid>
      <Participant name="한싸피" imgSrc="/mnt/data/image.png" isInstructor />
      <Participant name="김싸피" imgSrc="/mnt/data/image.png" isHelp={true} />
      <Participant name="전싸피" imgSrc="/mnt/data/image.png" isHighlighted />
    </ParticipantGrid>
  );
}

export default TeacherParticipantGrid;
