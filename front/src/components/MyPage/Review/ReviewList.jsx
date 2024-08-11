import React, { useState } from "react";
import styled from "styled-components";
import EditReviewModal from "./EditReviewModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReviewItem from "../../Review/ReviewItem";
import MoreButton from "../../common/MoreButton";

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
  cursor: pointer;
`;

const ClassImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  margin-right: 30px;
`;

const ClassDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hr = styled.hr`
  margin: 8px 0;
  border: 0.5px solid var(--BACKGROUND_COLOR);
`;

const ClassName = styled.div`
  font-weight: bold;
  color: var(--TEXT_PRIMARY);
`;

const ClassDate = styled.div`
  color: var(--TEXT_SECONDARY);
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

const ReviewList = ({ reviewList, setReviews, fetchMoreReviews }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(0);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [classId, setClassId] = useState(null);
  const [lectureId, setLectureId] = useState(null);
  const userId = useSelector((state) => state.auth.userId);

  const handleEdit = (review) => {
    setCurrentReview(review);
    setEditContent(review.reviewContent);
    setEditRating(review.rating);
    setIsEditing(true);
    setClassId(review.classId);
    setLectureId(review.lectureId);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${baseURL}/classes/${classId}/reviews/${currentReview.reviewId}`
      );
      alert("리뷰가 성공적으로 삭제되었습니다.");
      //setQuestions(questions.map(q => q.answer?.answerId === answerId ? { ...q, answer: null, isAnswered: false } : q));
      //삭제
    } catch (error) {
      alert("리뷰 삭제 실패. 다시 시도해주세요.");
      console.error("리뷰 삭제 에러:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `${baseURL}/classes/${classId}/reviews/${currentReview.reviewId}`,
        {
          reviewContent: editContent,
          rating: editRating,
          userId: userId,
          lectureId: lectureId,
        }
      );
      alert("리뷰가 성공적으로 수정되었습니다.");
      // setReviews(reviews.map(r => r?.reviewId === ));
      // 수정
      setIsEditing(false);
    } catch (error) {
      alert("리뷰 수정 실패. 다시 시도해주세요.");
      console.error("리뷰 수정 에러:", error);
    }
  };

  const handleClassClick = (classId) => {
    navigate(`/classes/detail/${classId}`); // Navigate 훅으로 페이지 이동 처리
  };

  return (
    <ListContainer>
      {reviewList.map((review) => (
        <ReviewItemContainer key={review.reviewId}>
          <ClassInfo onClick={() => handleClassClick(review.classId)}>
            <ClassImage
              src={`http://i11a106.p.ssafy.io:8080/files/download/${review.fileId}`}
              alt={review.className}
            />
            <ClassDetails>
              <ClassName>{review.className}</ClassName>
              <ClassDate>{`${review.year}.${String(review.month).padStart(2, "0")}.${String(review.day).padStart(2, "0")} ${String(review.hour).padStart(2, "0")}:${String(review.minute).padStart(2, "0")}`}</ClassDate>
            </ClassDetails>
          </ClassInfo>
          <Hr />
          <ReviewItem review={review} isMypage={true} />
          {/*
          <ButtonGroup>
            <EditButton onClick={() => handleEdit(review)}>수정</EditButton>
            <DeleteButton onClick={() => handleDelete(review.reviewId)}>
              삭제
            </DeleteButton>
          </ButtonGroup> */}
        </ReviewItemContainer>
      ))}
      <MoreButton onClick={fetchMoreReviews} />
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
