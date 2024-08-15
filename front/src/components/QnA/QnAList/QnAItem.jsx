import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import useAxios from "../../../hooks/useAxios";
import OutlineButton from "../../common/OutlineButton";
import AnswerItem from "../Answer/AnswerItem";
import Downward from "../../../assets/icon/class/downward-arrow.png";
import Upward from "../../../assets/icon/class/upward-arrow.png";
import AnswerModal from "../Answer/AnswerModal";
import QuestionModal from "../Question/QuestionModal";

const QnAItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 150px;
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const QnATitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const SmallFont = styled.div`
  font-size: 16px;
`;

const Answered = styled(SmallFont)`
  font-weight: 600;
  color: var(--GREEN);
`;

const NotAnswered = styled(SmallFont)`
  font-weight: 600;
  color: var(--RED);
`;

const SmallSecondary = styled(SmallFont)`
  color: var(--TEXT_SECONDARY);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 140px;
  justify-content: space-between;
`;

const AnswerButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  cursor: pointer;
  width: 120px;
  margin-top: 10px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const AnswerButtonText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--SECONDARY);
`;

function QnAItem({
  question,
  userId,
  isInstructor = false,
  isMyQuestion = false,
  onUpdate,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const { sendRequest: getAnswer, sendRequest: deleteQuestion } = useAxios();

  const handleDelete = async (questionId) => {
    try {
      await deleteQuestion(
        `/classes/${question?.classId}/questions/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
        "delete"
      );
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  // 질문 수정 조작
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const handleQuestionModal = () => {
    setShowQuestionModal(!showQuestionModal);
  };

  const fetchAnswer = useCallback(async () => {
    if (!answer) {
      try {
        const AnswerResponse = await getAnswer(
          `/questions/${question.questionId}/answers`,
          null,
          "get"
        );
        setAnswer(AnswerResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [answer, getAnswer, question.questionId]);

  const handleShowAnswer = async () => {
    if (!showAnswer) {
      await fetchAnswer();
    }
    setShowAnswer(!showAnswer);
  };

  const handleShowAnswerModal = () => {
    setShowAnswerModal(!showAnswerModal);
  };

  const handleAnswerSubmit = () => {
    question.isAnswered = true;
  };

  return (
    <QnAItemContainer>
      <DetailLine>
        <QnATitle>{question.title}</QnATitle>
        {question.isAnswered ? (
          <Answered>답변 완료</Answered>
        ) : isInstructor ? (
          <OutlineButton label={"답변 작성"} onClick={handleShowAnswerModal} />
        ) : (
          <NotAnswered>미답변</NotAnswered>
        )}
        <AnswerModal
          show={showAnswerModal}
          onClose={handleShowAnswerModal}
          question={question}
          userId={userId}
          onSubmit={handleAnswerSubmit}
        />
      </DetailLine>
      <DetailLine style={{ margin: "20px 0" }}>{question.content}</DetailLine>
      <DetailLine>
        <SmallSecondary>{question.createdDate.substring(0, 10)}</SmallSecondary>
        {!isMyQuestion ? (
          <SmallSecondary>{question.userNickname}</SmallSecondary>
        ) : question.isAnswered ? (
          <SmallSecondary>{question.userNickname}</SmallSecondary>
        ) : (
          <ButtonContainer>
            <OutlineButton
              label={"수정"}
              size={"sm"}
              onClick={handleQuestionModal}
            />
            <OutlineButton
              label={"삭제"}
              size={"sm"}
              color={"ACCENT1"}
              onClick={() => handleDelete(question.questionId)}
            />
          </ButtonContainer>
        )}
      </DetailLine>
      {showQuestionModal && (
        <QuestionModal
          show={showQuestionModal}
          isEdit={true}
          question={question}
          classId={question?.classId}
          userId={userId}
          onClose={handleQuestionModal}
          onSubmit={onUpdate}
        />
      )}
      {question.isAnswered && (
        <>
          <AnswerButton onClick={handleShowAnswer}>
            <Icon src={showAnswer ? Upward : Downward} />
            <AnswerButtonText>
              {showAnswer ? "답변 숨기기" : "답변 보기"}
            </AnswerButtonText>
          </AnswerButton>
          <AnswerItem
            show={showAnswer}
            answer={answer}
            isInstructor={isInstructor}
            question={question}
          />
        </>
      )}
    </QnAItemContainer>
  );
}

export default QnAItem;
