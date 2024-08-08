import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";

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

function ReviewAddModal({
  show,
  onClose,
  lectureList,
  userId,
  classId,
  onUpdate,
}) {
  if (!show) return null;

  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [selectedLecture, setSelectedLecture] = useState("");
  const { sendRequest } = useAxios();

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSelectChange = (event) => {
    setSelectedLecture(event.target.value);
  };

  const handleContentChange = (event) => {
    setReviewContent(event.target.value);
  };

  const handlePostReview = async () => {
    if (!reviewContent || !rating || !selectedLecture) {
      alert("내용을 정확히 입력해주세요.");
      return;
    }

    const reviewData = {
      reviewContent,
      rating,
      userId,
      lectureId: selectedLecture,
    };

    try {
      await sendRequest(`/classes/${classId}/reviews`, reviewData, "post");
      onUpdate();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <Title>리뷰 작성</Title>
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
        <ContentInput
          placeholder="내용을 입력해주세요."
          value={reviewContent}
          onChange={handleContentChange}
        />
      </ContentContainer>
      <OutlineButton label={"작성"} onClick={handlePostReview} />
    </Modal>
  );
}

export default ReviewAddModal;
