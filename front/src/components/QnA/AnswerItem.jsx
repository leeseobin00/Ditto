import styled from "styled-components";

const AnswerItemContainer = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  background-color: var(--BACKGROUND_COLOR);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
  padding: 2%;
  margin-top: 20px;
`;

const DetailLine = styled.div`
  align-items: center;
  font-size: 16px;
`;

const DetailLineSecondary = styled(DetailLine)`
  color: var(--TEXT_SECONDARY);
`;

function AnswerItem({ show }) {
  if (!show) return null;

  return (
    <AnswerItemContainer>
      <DetailLineSecondary>이강사</DetailLineSecondary>
      <DetailLine>잘 하면 됩니다.</DetailLine>
      <DetailLineSecondary>2024.07.11</DetailLineSecondary>
    </AnswerItemContainer>
  );
}

export default AnswerItem;
