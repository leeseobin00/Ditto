import React from 'react';
import styled from 'styled-components';
import ReviewItem from './ReviewItem';

const ListContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const LoadMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  background-color: var(--SECONDARY);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    filter: brightness(0.9);
  }
`;

const ReviewList = ({ reviews, fetchMoreReviews, handleEdit, handleClassClick }) => {
  return (
    <ListContainer>
      {reviews.map((review) => (
        <ReviewItem
          key={review.reviewId}
          review={review}
          onEdit={handleEdit}
          onClassClick={handleClassClick}
        />
      ))}
      <LoadMoreButtonContainer>
        <LoadMoreButton onClick={fetchMoreReviews}>더보기</LoadMoreButton>
      </LoadMoreButtonContainer>
    </ListContainer>
  );
};

export default ReviewList;
