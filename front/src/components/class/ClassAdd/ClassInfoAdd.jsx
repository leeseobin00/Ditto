import { styled } from "styled-components";
import ClassStepAdd from "./ClassStepAdd";

const ClassInfoAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ClassAddDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClassIntroductionInput = styled.textarea`
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

function ClassInfoAdd() {
  return (
    <ClassInfoAddContainer>
      <ClassAddDetailContainer>
        <Title>강의 소개</Title>
        <ClassIntroductionInput placeholder="강의에 대한 소개를 입력해주세요." />
      </ClassAddDetailContainer>
      <ClassAddDetailContainer>
        <Title>진행과정</Title>
        <ClassStepAdd />
      </ClassAddDetailContainer>
    </ClassInfoAddContainer>
  );
}

export default ClassInfoAdd;
