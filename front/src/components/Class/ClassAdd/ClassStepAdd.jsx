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

function ClassStepAdd() {
  const [showInput, setShowInput] = useState(false);
  const [steps, setSteps] = useState([]);

  function handleShowInput() {
    setShowInput(!showInput);
  }

  function handleStepAdd(newStep) {
    setSteps([...steps, newStep]);
    setShowInput(false);
  }

  function handleStepDelete(stepIndex) {
    setSteps(steps.filter((_, index) => index !== stepIndex));
  }

  return (
    <ClassStepAddContainer>
      {steps.map((step, index) => (
        <ClassStep
          key={index}
          isAdd={true}
          stepNo={index}
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
