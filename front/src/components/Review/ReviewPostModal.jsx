import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import Swal from "sweetalert2";

import useAxios from "../../hooks/useAxios";
import Modal from "../common/Modal";
import OutlineButton from "../common/OutlineButton";
import EmptyStar from "../../assets/icon/class/star-empty.png";
import Star from "../../assets/icon/class/star.png";

const Title = styled.div`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  margin-top: 25px;
  margin-bottom: 40px;
  justify-content: space-between;
`;

const StarRateContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 32%;
  justify-content: space-between;
  align-items: center;
`;

const StarImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const RatingDiv = styled.div`
  font-size: 16px;
`;

const SelectBox = styled.select`
  font-family: inherit;
  border-radius: 10px;
  border-color: var(--BORDER_COLOR);
  height: 40px;
  width: 100%;
  font-size: 16px;
  padding-left: 10px;
  color: var(--TEXT_SECONDARY);
  margin-bottom: 10px;
  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const ContentInput = styled.textarea`
  font-family: inherit;
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  resize: none;
  border-color: var(--BORDER_COLOR);
  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const LectureInfo = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  color: var(--TEXT_SECONDARY);
  margin: 10px;
  justify-content: space-between;
`;

const LectureDetail = styled.div`
  font-size: 14px;
`;

function ReviewPostModal({
  show,
  onClose,
  lectureList,
  userId,
  classId,
  onUpdate,
  isClass = true,
  payment,
  isEdit = false,
  initialReview,
}) {
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [selectedLecture, setSelectedLecture] = useState("");
  const { sendRequest } = useAxios();

  useEffect(() => {
    if (isEdit && initialReview) {
      setRating(initialReview.rating);
      setReviewContent(initialReview.reviewContent);
    }
  }, [isEdit, initialReview]);

  if (!show) return null;

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSelectChange = (event) => {
    setSelectedLecture(event.target.value);
  };

  const handleContentChange = (event) => {
    setReviewContent(event.target.value);
  };

  const handleEditReview = async () => {
    if (!reviewContent || !rating) {
      Swal.fire({
        title: "입력 오류",
        text: "내용과 별점을 모두 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
      return;
    }

    try {
      await sendRequest(
        `/classes/${initialReview?.classId}/reviews/${initialReview?.reviewId}`,
        {
          reviewContent,
          rating,
          userId: userId,
          lectureId: initialReview?.lectureId,
        },
        "patch"
      );
      Swal.fire({
        title: "수정 완료",
        text: "리뷰가 수정되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "var(--GREEN)",
      });
      onClose();
      onUpdate(reviewContent, rating);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "수정 실패",
        text: "리뷰 수정 중 오류가 발생했습니다.",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
    }
  };

  const handlePostReview = async () => {
    if (!reviewContent || !rating) {
      if (isClass && !selectedLecture) {
        Swal.fire({
          title: "입력 오류",
          text: "내용과 별점, 강의를 모두 입력해주세요.",
          icon: "warning",
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
        return;
      } else if (!isClass) {
        Swal.fire({
          title: "입력 오류",
          text: "내용과 별점, 강의를 모두 입력해주세요.",
          icon: "warning",
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
        return;
      }
    }
    const reviewData = {
      reviewContent,
      rating,
      userId,
      lectureId: isClass ? selectedLecture : payment.lectureId,
    };

    try {
      await sendRequest(`/classes/${classId}/reviews`, reviewData, "post");
      Swal.fire({
        title: "작성 완료",
        text: "리뷰가 작성되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "var(--GREEN)",
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "작성 실패",
        text: "리뷰 작성 중 오류가 발생했습니다.",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
    }
  };

  return (
    <Modal onClose={onClose}>
      <Title>{isEdit ? "리뷰 수정" : "리뷰 작성"}</Title>
      <ContentContainer>
        <StarRateContainer>
          <StarContainer>
            {[...Array(5)].map((_, index) => (
              <StarImg
                key={index}
                src={index < rating ? Star : EmptyStar}
                onClick={() => handleStarClick(index)}
              />
            ))}
          </StarContainer>
          <RatingDiv>별점을 선택해주세요.</RatingDiv>
        </StarRateContainer>
        {isClass ? (
          <SelectBox onChange={handleSelectChange} value={selectedLecture}>
            <option value="" disabled>
              강의를 선택해주세요
            </option>
            {lectureList.map((lecture, index) => (
              <option key={index} value={lecture.lectureId}>
                {String(lecture.year).padStart(4, "0")}-
                {String(lecture.month).padStart(2, "0")}-
                {String(lecture.day).padStart(2, "0")}&nbsp;
                {String(lecture.hour).padStart(2, "0")}:
                {String(lecture.minute).padStart(2, "0")}
              </option>
            ))}
          </SelectBox>
        ) : (
          <LectureInfo>
            <LectureDetail>
              {isEdit ? initialReview.className : payment?.className}
            </LectureDetail>
            <LectureDetail>
              {isEdit
                ? `${initialReview.year}-${String(initialReview.month).padStart(2, "0")}-${String(initialReview.day).padStart(2, "0")} ${String(initialReview.hour).padStart(2, "0")}:${String(initialReview.minute).padStart(2, "0")}`
                : `${payment.year}-${String(payment.month).padStart(2, "0")}-${String(payment.day).padStart(2, "0")} ${String(payment.hour).padStart(2, "0")}:${String(payment.minute).padStart(2, "0")}`}
            </LectureDetail>
          </LectureInfo>
        )}
        <ContentInput
          placeholder="내용을 입력해주세요."
          value={reviewContent}
          onChange={handleContentChange}
        />
      </ContentContainer>
      <OutlineButton
        label={isEdit ? "수정" : "작성"}
        onClick={isEdit ? handleEditReview : handlePostReview}
      />
    </Modal>
  );
}

export default ReviewPostModal;
