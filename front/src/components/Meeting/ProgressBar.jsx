import styled from "styled-components";

import MeetingButton from "./MeetingButton";

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 16px 24px;
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
  background-color: ${(props) =>
    props.$filled === "true" ? "var(--GREEN)" : "var(--LIGHT)"};
  border-radius: 2px;
`;

const ProgressDescription = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const ProgressName = styled.div`
  color: var(--LIGHT);
  font-size: 18px;
`;

const ProgressBar = ({ stages, currentStage, handleNextStage }) => {
  return (
    <ProgressBarWrapper>
      <Bar>
        {stages.map((_, index) => (
          <Box key={index} $filled={(index <= currentStage).toString()} />
        ))}
      </Bar>
      <ProgressDescription>
        <ProgressName>{stages[currentStage]}</ProgressName>
        <MeetingButton label={"Next"} onClick={handleNextStage} />
      </ProgressDescription>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
