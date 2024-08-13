import { styled } from "styled-components";
import { BsStar, BsStarFill } from "react-icons/bs";

const ReviewWrapper = styled.div`
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  width: 100%;
  max-width: calc(780px + 64px);
  padding: 32px;
  margin-bottom: 16px;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 8px;
`;

const CustomStarIcon = styled(BsStar)`
  font-size: 28px;
  color: var(--BORDER_COLOR);
  cursor: pointer;

  @media (max-width: 1024px) {
    font-size: 24px;
  }
`;

const CustomFilledStarIcon = styled(BsStarFill)`
  font-size: 28px;
  color: var(--YELLOW);
  cursor: pointer;

  @media (max-width: 1024px) {
    font-size: 24px;
  }
`;

const ClassName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 32px;
  background-color: var(--BACKGROUND_COLOR);
  border-radius: 25px;
  white-space: nowrap;
`;

const ContentWrapper = styled.div`
  margin-top: 24px;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;
`;

const Date = styled.p`
  color: var(--TEXT_SECONDARY);
  font-size: 14px;
`;

const Name = styled.p`
  color: var(--TEXT_SECONDARY);
  font-size: 14px;
  margin-left: 16px;
`;

function Review({ rating, className, content, date, reviewer }) {
  return (
    <ReviewWrapper>
      <TopWrapper>
        <Stars>
          {[...Array(5)].map((_, index) =>
            index < rating ? (
              <CustomFilledStarIcon
                key={index}
                // onClick={() => handleStarClick(index)}
              />
            ) : (
              <CustomStarIcon
                key={index}
                // onClick={() => handleStarClick(index)}
              />
            ),
          )}
        </Stars>
        <ClassName>{className}</ClassName>
      </TopWrapper>
      <ContentWrapper>{content}</ContentWrapper>
      <BottomWrapper>
        <Date>{date}</Date>
        <Name>{reviewer}</Name>
      </BottomWrapper>
    </ReviewWrapper>
  );
}

export default Review;
