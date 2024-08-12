import { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from 'sweetalert2';

import useAxios from "../../../hooks/useAxios";
import Modal from "../../common/Modal";
import OutlineButton from "../../common/OutlineButton";

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

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
  border-radius: 5px;
  background-color: var(--BACKGROUND_COLOR);
  padding: 15px 20px;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const QuestionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const QuestionDetail = styled.div`
  font-size: 14px;
  color: var(--TEXT_SECONDARY);
`;

const QuestionContent = styled.div`
  width: 100%;
  height: 90px;
  overflow-y: auto;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: var(--LIGHT);
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const AnswerTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const TextArea = styled.textarea`
  font-family: inherit;
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 5px;
  resize: none;
  margin: 10px 0;
  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const AnswerModal = ({
  show,
  onClose,
  onSubmit,
  userId,
  question,
  initialAnswer,
  isEdit = false,
}) => {
  const [answer, setAnswer] = useState("");
  const { sendRequest: postAnswer, sendRequest: patchAnswer } = useAxios();

  useEffect(() => {
    setAnswer(initialAnswer?.answer || "");
  }, [initialAnswer]);

  if (!show) return null;

  const handlePostAnswer = async () => {
    if (!answer) {
      await Swal.fire({
        title: '입력 오류',
        text: '답변을 작성해주세요.',
        icon: 'warning',
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
      return;
    }

    const answerData = {
      answerId: initialAnswer?.answerId || 0,
      answer: answer,
      createdDate: initialAnswer?.createdDate || "",
      userId: userId,
      questionId: question?.questionId || 0,
    };

    try {
      if (isEdit) {
        await patchAnswer(
          `/mypage/answer/${answerData?.answerId}`,
          { answer: answerData.answer },
          "patch"
        );
        await Swal.fire({
          title: '성공',
          text: '답변이 수정되었습니다.',
          icon: 'success',
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
      } else {
        await postAnswer(
          `/mypage/${userId}/answer/${question?.questionId}`,
          { answer: answerData.answer },
          "post"
        );
        await Swal.fire({
          title: '성공',
          text: '답변이 등록되었습니다.',
          icon: 'success',
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
      }
      onSubmit(answerData);
      setAnswer("");
      onClose();
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: '오류 발생',
        text: '답변 처리 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
    }
  };

  return (
    <Modal onClose={onClose}>
      <Title>{isEdit ? "답변 수정" : "답변 등록"}</Title>
      <ContentContainer>
        <QuestionContainer>
          <LineContainer>
            <QuestionTitle>{question?.title}</QuestionTitle>
            <QuestionDetail>{question?.userNickname}</QuestionDetail>
          </LineContainer>
          <QuestionContent>
            <div style={{ fontSize: "16px" }}>{question?.content}</div>
          </QuestionContent>
          <QuestionDetail style={{ textAlign: "right" }}>
            {question?.createdDate.substring(0, 10)}
          </QuestionDetail>
        </QuestionContainer>
        <AnswerContainer>
          <AnswerTitle>답변</AnswerTitle>
          <TextArea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="답변을 작성하세요"
          />
        </AnswerContainer>
      </ContentContainer>
      <ModalFooter>
        <OutlineButton color={"ACCENT1"} label={"취소"} onClick={onClose} />
        <OutlineButton
          label={isEdit ? "수정" : "등록"}
          onClick={handlePostAnswer}
        />
      </ModalFooter>
    </Modal>
  );
};

export default AnswerModal;
