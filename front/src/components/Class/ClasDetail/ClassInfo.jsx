import { styled } from "styled-components";

import ClassStepList from "./ClassStepList";
import ClassKit from "./ClassKit";
import ReviewList from "../../Review/ReviewList";
import QnAList from "../../QnA/QnAList";
import Button from "../../common/Button";

const ClassIntroductionContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const TitleLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const ButtonContainer = styled.div``;

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
        <TitleLine>
          <Title>리뷰</Title>
          <Button label={"리뷰작성"} />
        </TitleLine>
        <ReviewList />
      </ContentContainer>
      <ContentContainer id={titleIds[2]}>
        <TitleLine>
          <Title>Q & A</Title>

          <Button label={"문의하기"} />
        </TitleLine>
        <QnAList />
      </ContentContainer>
    </ClassIntroductionContainer>
  );
}

export default ClassInfo;
