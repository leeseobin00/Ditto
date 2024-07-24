import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const ReviewItem = ({ review, onEdit, onClassClick }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-review/${review.reviewId}`);
  };

  return (
    <ReviewItemContainer>
      <ClassInfo onClick={() => onClassClick(review.classId)}>
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
        <EditButton onClick={handleEdit}>수정</EditButton>
      </ButtonGroup>
    </ReviewItemContainer>
  );
};

export default ReviewItem;
