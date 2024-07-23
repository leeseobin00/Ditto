import styled from "styled-components";

import MeetingButton from "./MeetingButton";

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
  background-color: ${(props) => (props.$filled === "true" ? "var(--GREEN)" : "var(--LIGHT)")};
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

const ProgressBar = ({ stages, currentStage, handleNextClick }) => {
  return (
    <ProgressBarContainer>
      <Progress>
        <Bar>
          {stages.map((_, index) => (
            <Box key={index} $filled={(index <= currentStage).toString()} />
          ))}
        </Bar>
      </Progress>
      <ProgressDescription>
        <StageName>{stages[currentStage]}</StageName>
        <MeetingButton label={"Next"} onClick={handleNextClick} />
      </ProgressDescription>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
