import { styled, keyframes } from "styled-components";
import { useSelector } from "react-redux";
import MeetingButton from "./MeetingButton";
import { BiSolidFolder } from "react-icons/bi";

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
  height: 32px;
`;

const ProgressName = styled.div`
  display: flex;
  color: var(--LIGHT);
  font-size: 16px;
`;

const FolderIconWrapper = styled.div`
  position: relative;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover div{
    display: flex;
  }
`;

const CustomFolderIcon = styled(BiSolidFolder)`
  cursor: pointer;
`;

const ProgressContent = styled.div`
  display: none;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 24px;
  left: 0px;
  padding: 16px;
  border-radius: 8px;
  width: 400px;
  max-width: 400px;
  max-height: 200px;
  overflow-y: auto;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  background-color:  var(--MEETING_SECONDARY);
  color: var(--LIGHT);
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid var(--LIGHT);
  border-top: 4px solid var(--GREEN);
  border-radius: 100%;
  width: 18px;
  height: 18px;
  animation: ${spin} 1s linear infinite;
`;

function ProgressBar({ steps
  , currentStep
  , loading
  , handleStartStep
  , handleNextStep
  , handleEndStep }){
  const roleId = useSelector((state)=>state.auth.roleId);
  
  return (
    <ProgressBarWrapper>
      <Bar>
        {steps.map((step, index) => (
          <Box key={index} $filled={(index < currentStep).toString()} />
        ))}
      </Bar>
      <ProgressDescription>
        <ProgressName>
          {(currentStep>=0 && currentStep<steps.length) && 
          <FolderIconWrapper>
            <CustomFolderIcon />
            <ProgressContent>
              {steps[currentStep]?.stepDetail}
            </ProgressContent>  
          </FolderIconWrapper>}
          {steps[currentStep]?.stepName}
        </ProgressName>
        {(roleId==2 && !loading) && <>
          {currentStep==-1 && <MeetingButton label="Start" onClick={handleStartStep} />}
          {(currentStep>=0 && currentStep<steps.length-1) && <MeetingButton label="Next" onClick={handleNextStep} />}
          {currentStep==steps.length-1 && <MeetingButton label="End" onClick={handleEndStep} />}
        </>}
        {(roleId==2 && loading) && <Spinner/>}
      </ProgressDescription>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
