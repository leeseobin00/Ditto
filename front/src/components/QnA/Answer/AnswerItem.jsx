import { useState } from "react";
import { styled } from "styled-components";

import useAxios from "../../../hooks/useAxios";
import OutlineButton from "../../common/OutlineButton";
import AnswerModal from "./AnswerModal";

const AnswerItemContainer = styled.div`
  width: 100%;
  min-height: 150px;
  height: 120px;
  border-radius: 10px;
  background-color: var(--BACKGROUND_COLOR);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  padding: 20px;
  margin-top: 20px;
`;

const DetailLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
`;

const DetailLineSecondary = styled(DetailLine)`
  color: var(--TEXT_SECONDARY);
`;

function AnswerItem({ show, answer, isInstructor, question }) {
  if (!show) return null;

  // 답변 수정
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(answer);

  const handleShowAnswerModal = () => {
    setShowAnswerModal(!showAnswerModal);
  };

  const handleAnswerSubmit = (newAnswer) => {
    setCurrentAnswer(newAnswer);
  };

  return (
    <>
      <AnswerItemContainer>
        <DetailLine>
          <DetailLineSecondary>{answer?.userNickname}</DetailLineSecondary>
          {isInstructor && (
            <OutlineButton
              label={"수정"}
              size={"sm"}
              onClick={handleShowAnswerModal}
            />
          )}
        </DetailLine>
        <DetailLine>{currentAnswer?.answer}</DetailLine>
        <DetailLineSecondary style={{ justifyContent: "flex-end" }}>
          {answer?.createdDate?.substring(0, 10)}
        </DetailLineSecondary>
      </AnswerItemContainer>
      <AnswerModal
        show={showAnswerModal}
        onClose={handleShowAnswerModal}
        question={question}
        initialAnswer={currentAnswer}
        isEdit={true}
        onSubmit={handleAnswerSubmit}
      />
    </>
  );
}

export default AnswerItem;
