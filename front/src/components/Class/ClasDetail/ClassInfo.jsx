import { styled } from "styled-components";

import ClassStepList from "./ClassStepList";
import ClassKit from "./ClassKit";
import ReviewList from "../../Review/ReviewList";

const ClassIntroductionContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
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

function ClassInfo({ classInfo, titleIds }) {
  return (
    <ClassIntroductionContainer>
      <ContentContainer id={titleIds[0]}>
        <Title>강의 소개</Title>
        <ClassExplanation>{classInfo.classExplanation}</ClassExplanation>
        <ClassStepList steps={classInfo.steps} />
        <ClassKit kit={classInfo.kit} />
      </ContentContainer>
      <ContentContainer id={titleIds[1]}>
        <Title>리뷰</Title>
        <ReviewList />
      </ContentContainer>
      <ContentContainer id={titleIds[2]}>
        <Title>Q & A</Title>
      </ContentContainer>
    </ClassIntroductionContainer>
  );
}

export default ClassInfo;
