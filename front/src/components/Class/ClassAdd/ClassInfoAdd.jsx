import { useState, useEffect, useCallback } from "react";
import { styled } from "styled-components";

import ClassStepAdd from "./ClassStepAdd";
import ClassKitAdd from "./ClassKitAdd";

const ClassInfoAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  align-items: center;
`;

const ClassAddDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const ExplanationInput = styled.textarea`
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  border-width: 0.5px;
  border-style: solid;
  border-color: var(--BORDER_COLOR);
  margin: 15px 0;
  padding: 10px;
  &::placeholder {
    color: var(--TEXT_SECONDARY);
  }
  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
  overflow-wrap: break-word;
  overflow-y: auto;
  resize: none;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
`;

function ClassInfoAdd({ onChange }) {
  const [classExplanation, setClassExplanation] = useState("");
  const [steps, setSteps] = useState([]);
  const [kit, setKit] = useState({});

  const handleClassExplanationChange = (e) => {
    setClassExplanation(e.target.value);
  };

  const handleStepsChange = (newSteps) => {
    setSteps(newSteps);
  };

  const handleKitChange = (newKit) => {
    setKit(newKit);
  };

  const updateInfoData = useCallback(() => {
    onChange({ classExplanation, steps, kit });
  }, [classExplanation, steps, kit, onChange]);

  useEffect(() => {
    updateInfoData();
  }, [classExplanation, steps, kit, updateInfoData]);

  return (
    <ClassInfoAddContainer>
      <ClassAddDetailContainer>
        <Title>강의 소개</Title>
        <ExplanationInput
          placeholder="강의에 대한 소개를 입력해주세요."
          value={classExplanation}
          onChange={handleClassExplanationChange}
        />
      </ClassAddDetailContainer>
      <ClassAddDetailContainer>
        <Title>진행 과정</Title>
        <ClassStepAdd onChange={handleStepsChange} />
      </ClassAddDetailContainer>
      <ClassAddDetailContainer>
        <Title>제공 키트</Title>
        <ClassKitAdd onChange={handleKitChange} />
      </ClassAddDetailContainer>
    </ClassInfoAddContainer>
  );
}

export default ClassInfoAdd;
