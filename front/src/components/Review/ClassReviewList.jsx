import styled from "styled-components";

import ReviewItem from "./ReviewItem";
import MoreButton from "../common/MoreButton";

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0;
  align-items: center;
`;

const ReviewNull = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
  padding: 20px;
`;

function ClassReviewList({
  reviewList,
  totalReviewCount,
  curReviewpage,
  onUpdate,
}) {
  return (
    <ReviewListContainer>
      {reviewList.length == 0 && (
        <ReviewNull>등록된 리뷰가 없습니다.</ReviewNull>
      )}
      {reviewList.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
      {curReviewpage < totalReviewCount && <MoreButton onClick={onUpdate} />}
    </ReviewListContainer>
  );
}

export default ClassReviewList;
