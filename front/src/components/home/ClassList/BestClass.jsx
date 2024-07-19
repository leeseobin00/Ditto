import { styled } from "styled-components";

import BestClassList from "./BestClassList";

const BestClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  padding: 0 20px;
`;

const BestClassTitle = styled.div`
  font-size: 25px;
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
