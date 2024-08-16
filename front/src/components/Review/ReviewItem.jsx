import { styled } from "styled-components";
import Swal from "sweetalert2";

import axios from "axios";
import Star from "../../assets/icon/class/star.png";
import EmptyStar from "../../assets/icon/class/star-empty.png";
import OutlineButton from "../common/OutlineButton";
import ReviewPostModal from "./ReviewPostModal";
import { useState } from "react";

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

const SpaceLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 140px;
`;

const ContentLine = styled.div`
  width: 100%;
  white-space: normal;
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

function ReviewItem({ review, isMypage = false, onUpdate, userId }) {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [reviewContent, setReviewContent] = useState(review.reviewContent);
  const [rating, setRating] = useState(review.rating);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "리뷰 삭제 확인",
      text: "이 리뷰를 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      confirmButtonColor: "#FF7F50",
      cancelButtonColor: "#6c757d",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${baseURL}/classes/${review.classId}/reviews/${review.reviewId}`
        );
        await Swal.fire({
          title: "삭제 완료",
          text: "리뷰가 삭제되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
        onUpdate();
      } catch (error) {
        console.error(error);
        await Swal.fire({
          title: "삭제 실패",
          text: "리뷰 삭제 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
      }
    }
  };

  // 리뷰 수정
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleShowReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const handleReviewUpdate = (updatedReviewContent, updatedRating) => {
    setReviewContent(updatedReviewContent);
    setRating(updatedRating);
  };

  return (
    <ReviewItemContainer>
      <SpaceLine>
        <DetailLine>
          {Array.from({ length: rating }, (_, index) => (
            <Icon key={index} src={Star} />
          ))}
          {Array.from({ length: 5 - rating }, (_, index) => (
            <Icon key={index} src={EmptyStar} />
          ))}
        </DetailLine>
        {isMypage && (
          <ButtonContainer>
            <OutlineButton
              label={"수정"}
              size={"sm"}
              onClick={handleShowReviewModal}
            />
            <OutlineButton
              label={"삭제"}
              color={"ACCENT1"}
              size={"sm"}
              onClick={() => handleDelete(review.reviewId)}
            />
          </ButtonContainer>
        )}
      </SpaceLine>
      <ContentLine>{reviewContent}</ContentLine>
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
      <ReviewPostModal
        show={showReviewModal}
        onClose={handleShowReviewModal}
        initialReview={review}
        isEdit={true}
        isClass={false}
        userId={userId}
        onUpdate={handleReviewUpdate}
      />
    </ReviewItemContainer>
  );
}

export default ReviewItem;
