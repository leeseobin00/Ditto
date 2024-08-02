import React, { useState } from 'react';
import styled from 'styled-components';
import EditReviewModal from './EditReviewModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const ReviewItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 10px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClassInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--BORDER_COLOR);
  cursor: pointer;
`;

const ClassImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin-right: 20px;
`;

const ClassDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClassName = styled.div`
  font-weight: bold;
  color: var(--TEXT_PRIMARY);
`;

const ClassDate = styled.div`
  color: var(--TEXT_SECONDARY);
`;

const ReviewContent = styled.div`
  margin-top: 10px;
  color: var(--TEXT_SECONDARY);
`;

const ReviewDate = styled.div`
  margin-top: 5px;
  color: var(--TEXT_SECONDARY);
`;

const Rating = styled.div`
  color: var(--YELLOW);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  background-color: var(--SECONDARY);
  color: var(--LIGHT);
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const DeleteButton = styled.button`
  background-color: var(--LIGHT);
  color: var(--RED);
  border: 1px solid var(--RED);
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
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

const ReviewList = ({ reviews, fetchMoreReviews }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editRating, setEditRating] = useState(0);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [classId, setClassId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [lectureId, setLectureId] = useState(null);

  const handleEdit = (review) => {
    setCurrentReview(review);
    setEditContent(review.reviewContent);
    setEditRating(review.rating);
    setIsEditing(true);
    setClassId(review.classId);
    setUserId(review.userId);
    setLectureId(review.lectureId);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseURL}/classes/${classId}/reviews/${currentReview.reviewId}`);
      alert('리뷰가 성공적으로 삭제되었습니다.');
      // 삭제 후 리뷰 목록 갱신
    } catch (error) {
      alert('리뷰 삭제 실패. 다시 시도해주세요.');
      console.error('리뷰 삭제 에러:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(`${baseURL}/classes/${classId}/reviews/${currentReview.reviewId}`, {
        reviewContent: editContent,
        rating: editRating,
        userId: userId,
        lectureId: lectureId,
      });
      alert('리뷰가 성공적으로 수정되었습니다.');
      // 수정 후 리뷰 목록 갱신
      setIsEditing(false);
    } catch (error) {
      alert('리뷰 수정 실패. 다시 시도해주세요.');
      console.error('리뷰 수정 에러:', error);
    }
  };

  const handleClassClick = (classId) => {
    navigate(`/classes/detail/${classId}`); // Navigate 훅으로 페이지 이동 처리
  };

  return (
    <ListContainer>
      {reviews.map((review) => (
        <ReviewItemContainer key={review.reviewId}>
          <ClassInfo onClick={() => handleClassClick(review.classId)}>
            <ClassImage src={review.fileUrl} alt={review.className} />
            <ClassDetails>
              <ClassName>{review.className}</ClassName>
              <ClassDate>{`${review.year}.${String(review.month).padStart(2, '0')}.${String(review.day).padStart(2, '0')} ${String(review.hour).padStart(2, '0')}:${String(review.minute).padStart(2, '0')}`}</ClassDate>
            </ClassDetails>
          </ClassInfo>
          <ReviewHeader>
            <Rating>
              {'★'.repeat(review.rating)}{' '}
              {'☆'.repeat(5 - review.rating)}
            </Rating>
            <ReviewDate>{new Date(review.createdDate).toLocaleDateString()}</ReviewDate>
          </ReviewHeader>
          <ReviewContent>{review.reviewContent}</ReviewContent>
          <ButtonGroup>
            <EditButton onClick={() => handleEdit(review)}>수정</EditButton>
            <DeleteButton onClick={() => handleDelete(review.reviewId)}>삭제</DeleteButton>
          </ButtonGroup>
        </ReviewItemContainer>
      ))}
      <LoadMoreButtonContainer>
        <LoadMoreButton onClick={fetchMoreReviews}>더보기</LoadMoreButton>
      </LoadMoreButtonContainer>
      {isEditing && (
        <EditReviewModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveEdit}
          title={currentReview.className}
          content={editContent}
          setContent={setEditContent}
          rating={editRating}
          setRating={setEditRating}
        />
      )}
    </ListContainer>
  );
};

export default ReviewList;
