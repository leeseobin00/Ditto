import styled from "styled-components";

const AnswerItemContainer = styled.div`
  width: 100%;
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
  align-items: center;
  font-size: 16px;
`;

const DetailLineSecondary = styled(DetailLine)`
  color: var(--TEXT_SECONDARY);
`;

function AnswerItem({ show, answer }) {
  if (!show) return null;

  return (
    <AnswerItemContainer>
      <DetailLineSecondary>{answer?.userNickname}</DetailLineSecondary>
      <DetailLine>{answer?.answer}</DetailLine>
      <DetailLineSecondary style={{ textAlign: "right" }}>
        {answer?.createdDate?.substring(0, 10)}
      </DetailLineSecondary>
    </AnswerItemContainer>
  );
}

export default AnswerItem;
