import { styled } from "styled-components";
import Participant from "./Participant";

const ParticipantGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.open ? "flex-start" : "center")};
  align-items: flex-start;
  width: 100%;
  height: calc(
    100vh - 60px - 80px - 60px - 32px
  ); /* Adjust height to consider the footer */
  gap: 16px;
  padding: 0px 24px;
  margin-right: ${(props) => (props.open ? "400px" : "0px")};

  @media (max-width: 1024px) {
    margin-right: 32px;
  }
`;

const TeacherContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 660px;
  width: ${(props) => (props.open ? "52%" : "60%")};
`;

const StudentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 440px;
  width: ${(props) => (props.open ? "48%" : "40%")};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
  width: 100%;
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
  background-color: var(--RED);
`;

const CompleteButton = styled(Button)`
  background-color: var(--GREEN);
`;

function StudentParticipantGrid({ isOpen }) {
  return (
    <ParticipantGrid open={isOpen}>
      <TeacherContainer open={isOpen}>
        <Participant name="이강사" imgSrc="/mnt/data/image.png" />
      </TeacherContainer>
      <StudentContainer open={isOpen}>
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
