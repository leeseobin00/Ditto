import { styled } from "styled-components";

import ClassStepList from "./ClassStepList";
import ClassKit from "./ClassKit";

const ClassIntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

const ClassExplanation = styled.div`
  font-size: 20px;
  margin: 15px 0;
`;

function ClassInfo({ classInfo }) {
  return (
    <ClassIntroductionContainer>
      <Title>강의 소개</Title>
      <ClassExplanation>{classInfo.classExplanation}</ClassExplanation>
      <ClassStepList steps={classInfo.steps} />
      <ClassKit kit={classInfo.kit} />
    </ClassIntroductionContainer>
  );
}

export default ClassInfo;
