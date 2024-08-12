import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReviewItem from "./ReviewItem";
import MoreButton from "../common/MoreButton";

const ListContainer = styled.div`
  margin: 10px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
`;

const ClassInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ClassImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  margin-right: 30px;
  cursor: pointer;
`;

const ClassDetails = styled.div`
  display: flex;
  flex-direction: column;
  height: 70px;
  padding: 10px 0;
  justify-content: space-between;
`;

const Hr = styled.hr`
  margin: 8px 0;
  border: 0.5px solid var(--BACKGROUND_COLOR);
`;

const ClassName = styled.div`
  font-weight: bold;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;
`;

const ClassDate = styled.div`
  color: var(--TEXT_SECONDARY);
  font-size: 14px;
`;

const MyPageReviewList = ({
  reviewList,
  fetchMoreReviews,
  onUpdate,
  userId,
  showMoreButton,
}) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClassClick = (classId) => {
    navigate(`/classes/detail/${classId}`); // Navigate 훅으로 페이지 이동 처리
  };

  return (
    <ListContainer>
      {reviewList.map((review) => (
        <ReviewItemContainer key={review.reviewId}>
          <ClassInfo>
            <ClassImage
              src={`http://i11a106.p.ssafy.io:8080/files/download/${review.fileId}`}
              alt={review.className}
              onClick={() => handleClassClick(review.classId)}
            />
            <ClassDetails>
              <ClassName onClick={() => handleClassClick(review.classId)}>
                {review.className}
              </ClassName>
              <ClassDate>{`${review.year}-${String(review.month).padStart(2, "0")}-${String(review.day).padStart(2, "0")}  ${String(review.hour).padStart(2, "0")}:${String(review.minute).padStart(2, "0")}`}</ClassDate>
            </ClassDetails>
          </ClassInfo>
          <Hr />
          <ReviewItem
            review={review}
            isMypage={true}
            onUpdate={onUpdate}
            userId={userId}
          />
        </ReviewItemContainer>
      ))}
      {showMoreButton && <MoreButton onClick={fetchMoreReviews} />}
    </ListContainer>
  );
};

export default MyPageReviewList;
