import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import useAxios from "../../../hooks/useAxios";
import OutlineButton from "../../common/OutlineButton";
import AnswerItem from "../Answer/AnswerItem";
import Downward from "../../../assets/icon/class/downward-arrow.png";
import Upward from "../../../assets/icon/class/upward-arrow.png";
import AnswerModal from "../Answer/AnswerModal";

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
  font-size: 18px;
  font-weight: 600;
  color: var(--SECONDARY);
`;

function QnAItem({ question, userId, isInstructor = false }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const { sendRequest: getAnswer } = useAxios();

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
        <SmallSecondary>{question.userNickname}</SmallSecondary>
      </DetailLine>
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
