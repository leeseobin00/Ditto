import { styled } from "styled-components";

const ReviewListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 100%;
  border-style: solid;
  border-radius: 10px;
  border-color: var(--BORDER_COLOR);
`;

const ReviewDetail = styled.div`
  display: flex;
`

function ReviewListItem ({review}) {
  return (
    <ReviewListItemContainer>
      <ReviewDetail></ReviewDetail>
    </ReviewListItemContainer>
  );
}