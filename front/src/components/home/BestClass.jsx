import { styled } from "styled-components";

import BestClassList from "./BestClassList";

const BestClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5% 0;
  padding: 0 20px;
`;

const BestClassTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

function BestClass() {
  return (
    <BestClassContainer>
      <BestClassTitle>Best Class</BestClassTitle>
      <BestClassList />
    </BestClassContainer>
  );
}

export default BestClass;
