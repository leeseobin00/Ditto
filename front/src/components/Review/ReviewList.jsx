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
  font-size: 20px;
  color: var(--TEXT_SECONDARY);
  padding: 20px;
`;

function ReviewList() {
  const reviewList = [
    {
      reviewContent: "너무 유익하고 강사님이 친절하십니다!",
      createdDate: "2024-07-06",
      rating: 4,
      userNickname: "김디토",
    },
    {
      reviewContent: "너무 유익하고 강사님이 친절하십니다!",
      createdDate: "2024-07-06",
      rating: 5,
      userNickname: "김디토",
    },
    {
      reviewContent: "너무 유익하고 강사님이 친절하십니다!",
      createdDate: "2024-07-06",
      rating: 3,
      userNickname: "김디토",
    },
  ];

  return (
    <ReviewListContainer>
      {reviewList.length == 0 && (
        <ReviewNull>등록된 리뷰가 없습니다.</ReviewNull>
      )}
      {reviewList.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
      <MoreButton />
    </ReviewListContainer>
  );
}

export default ReviewList;
