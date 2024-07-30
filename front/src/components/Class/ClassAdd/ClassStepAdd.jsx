import { useState } from "react";
import { styled } from "styled-components";

import AddButton from "./AddButton";
import ClassStepAddInput from "./ClassStepAddInput";
import ClassStep from "../ClasDetail/ClassStep";

const ClassStepAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0;
  justify-content: center;
  align-items: center;
`;

function ClassStepAdd({ onChange }) {
  const [showInput, setShowInput] = useState(false);
  const [steps, setSteps] = useState([]);

  function handleShowInput() {
    setShowInput(!showInput);
  }

  function handleStepAdd(newStep) {
    const updatedSteps = [...steps, newStep];
    setSteps(updatedSteps);
    setShowInput(false);
    onChange(updatedSteps); // 상위 컴포넌트로 전달
  }

  function handleStepDelete(stepIndex) {
    const updatedSteps = steps.filter((_, index) => index !== stepIndex);
    setSteps(updatedSteps);
    onChange(updatedSteps); // 상위 컴포넌트로 전달
  }

  return (
    <ClassStepAddContainer>
      {steps.map((step, index) => (
        <ClassStep
          key={index}
          isAdd={true}
          stepNo={index + 1}
          step={step}
          onDelete={() => handleStepDelete(index)}
        />
      ))}

      <ClassStepAddInput
        show={showInput}
        onSubmit={handleStepAdd}
        stepNo={steps.length + 1}
      />
      {showInput ? null : <AddButton onClick={handleShowInput} />}
    </ClassStepAddContainer>
  );
}

export default ClassStepAdd;
