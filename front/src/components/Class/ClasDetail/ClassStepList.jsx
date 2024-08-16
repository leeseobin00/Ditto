import { styled } from "styled-components";

import ClassStep from "./ClassStep";

const ClassStepListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 5px;
`;

function ClassStepList({ steps }) {
  return (
    <ClassStepListContainer>
      <Title>진행 과정</Title>
      {steps.map((step, index) => (
        <ClassStep key={index} stepNo={index + 1} step={step} />
      ))}
    </ClassStepListContainer>
  );
}

export default ClassStepList;
