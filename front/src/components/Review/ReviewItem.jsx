import { styled } from "styled-components";

import Star from "../../assets/icon/class/star.png";
import EmptyStar from "../../assets/icon/class/star-empty.png";

const ReviewItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-style: solid;
  border-width: 0.5px;
  border-radius: 10px;
  border-color: var(--BORDER_COLOR);
  padding: 20px;
  margin: 10px 0;
  justify-content: space-between;
`;

const DetailLine = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  align-items: center;
`;

const ContentLine = styled.div`
  width: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 15px 0;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const DetailLineSecondary = styled(DetailLine)`
  color: var(--TEXT_SECONDARY);
  justify-content: space-between;
  align-self: flex-end;
`;

function ReviewItem({ review, isMypage }) {
  return (
    <ReviewItemContainer>
      <DetailLine>
        {Array.from({ length: review.rating }, (_, index) => (
          <Icon key={index} src={Star} />
        ))}
        {Array.from({ length: 5 - review.rating }, (_, index) => (
          <Icon key={index} src={EmptyStar} />
        ))}
      </DetailLine>
      <ContentLine>{review.reviewContent}</ContentLine>
      <DetailLineSecondary>
        {!isMypage && (
          <>
            <div>{review?.reviewer?.nickname}</div>
            <div style={{ margin: "0 10px", color: "var(--TEXT_PRIMARY" }}>
              |
            </div>
          </>
        )}

        <div>{review.createdDate.substring(0, 10)}</div>
      </DetailLineSecondary>
    </ReviewItemContainer>
  );
}

export default ReviewItem;
