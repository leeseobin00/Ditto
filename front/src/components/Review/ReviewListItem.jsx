import { styled } from "styled-components";

const ClassStepContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: var(--TERTIARY);
  padding: 2%;
  border-radius: 10px;
  justify-content: space-between;
  margin: 10px 0;
`;

const ReviewListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  width: 100%;
  border-style: solid;
  border-width: 0.5px;
  border-radius: 10px;
  border-color: var(--BORDER_COLOR);
  padding: 2%;
  margin: 10px 0;
`;

const ReviewDetail = styled.div`
  display: flex;
`;

function ReviewListItem({ review }) {
  return (
    <ReviewListItemContainer>
      <ReviewDetail></ReviewDetail>
    </ReviewListItemContainer>
  );
}

export default ReviewListItem;
