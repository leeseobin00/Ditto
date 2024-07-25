import styled from "styled-components";

import ReviewItem from "./ReviewItem";
import MoreButton from "../common/MoreButton";

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0;
`;

function ReviewList() {
  const reviews = [
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
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
      <MoreButton />
    </ReviewListContainer>
  );
}

export default ReviewList;
