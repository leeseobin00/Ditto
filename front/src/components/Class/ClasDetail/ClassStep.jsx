import { styled } from "styled-components";

import { MdClose } from "react-icons/md";

const ClassStepContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 120px;
  background-color: var(--TERTIARY);
  padding: 2%;
  border-radius: 10px;
  justify-content: space-between;
  margin: 10px 0;
`;

const StepNo = styled.div`
  background-color: var(--SECONDARY);
  width: 25px;
  height: 25px;
  color: var(--LIGHT);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 20px;
  font-weight: 600;
  margin-right: 10px;
`;

const StepDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;
  margin-right: 10px;
  padding: 3px 0 0 0;
`;

const StepName = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 15px;
`;

const StepExplation = styled.div`
  font-size: 16px;
`;

const Img = styled.img`
  width: 120px;
  height: 100px;
  max-height: 110px;
  margin: auto 0;
  border-radius: 10px;
`;

const DeleteButton = styled(MdClose)`
  background-color: transparent;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border-style: none;
  text-align: center;
  color: var(--TEXT_SECONDARY);
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: var(--SECONDARY);
  }

  &:active {
    color: var(--SECONDARY);
  }
`;

function ClassStep({ isAdd = false, stepNo, step, onDelete }) {
  return (
    <ClassStepContainer>
      <StepNo>{stepNo}</StepNo>
      <StepDetail>
        <StepName>{step.stepName}</StepName>
        <StepExplation>{step.stepDetail}</StepExplation>
      </StepDetail>
      <Img
        src={
          isAdd
            ? step.preview
            : `http://i11a106.p.ssafy.io:8080/files/download/${step.file.fileId}`
        }
      />
      {isAdd && <DeleteButton onClick={onDelete} />}
    </ClassStepContainer>
  );
}

export default ClassStep;
