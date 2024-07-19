import { styled } from "styled-components";

import BestBoardList from "./BestBoardList";

const BestBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  padding: 0 20px;
`;

const BestBoardTitle = styled.div`
  font-size: 25px;
  font-weight: 700;
`;

function BestBoard() {
  return (
    <BestBoardContainer>
      <BestBoardTitle>Best 게시글</BestBoardTitle>
      <BestBoardList />
    </BestBoardContainer>
  );
}

export default BestBoard;
