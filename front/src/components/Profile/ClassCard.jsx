import { styled } from "styled-components";

import Tag from "../Profile/Tag";

const CardWrapper = styled.div`
  background-color: white;
  width: 260px;
  overflow: hidden;
  margin-bottom: 16px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  width: 260px;
  aspect-ratio: 4 / 3;
  background-color: lightgray;
  border-radius: 10px;
`;

const ContentWrapper = styled.div`
  margin-top: 8px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
`;

const Date = styled.p`
  font-size: 14px;
  color: var(--TEXT_SECONDARY);
`;

const Instructor = styled.div`
  font-size: 14px;
  color: var(--TEXT_TERTIARY);
`;

function ClassCard() {
  return (
    <CardWrapper>
      <Image />
      <ContentWrapper>
        <Title>내가 원하는 대로! 커스텀 향수 만들기 입문</Title>
        <Info>
          <Date>2024-06-05</Date>
          <Instructor>이강사</Instructor>
          <Tag tagName="향수" />
        </Info>
      </ContentWrapper>
    </CardWrapper>
  );
}

export default ClassCard;
