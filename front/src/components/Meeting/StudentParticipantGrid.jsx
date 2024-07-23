import { styled } from "styled-components";
import LargeParticipant from "./LargeParticipant";
import Participant from "./Participant";

const ParticipantGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  gap: 16px;
`;

const TeacherContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StudentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const HelpButton = styled(Button)`
  background-color: VAR(--RED);
`;

const CompleteButton = styled(Button)`
  background-color: var(--GREEN);
`;

function StudentParticipantGrid() {
  return (
    <ParticipantGrid>
      <TeacherContainer>
        <LargeParticipant
          name="이강사"
          imgSrc="/mnt/data/image.png"
          isInstructor
        />
      </TeacherContainer>
      <StudentContainer>
        <Participant name="한예슬" imgSrc="/mnt/data/image.png" />
        <ButtonContainer>
          <HelpButton>도움이 필요해요</HelpButton>
          <CompleteButton>단계를 완료했어요</CompleteButton>
        </ButtonContainer>
      </StudentContainer>
    </ParticipantGrid>
  );
}

export default StudentParticipantGrid;
