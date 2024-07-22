import { styled } from "styled-components";

import BestClassList from "./BestClassList";

const BestClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  padding: 0 20px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
`;

function BestClass() {
  return (
    <BestClassContainer>
      <Title>Best Class</Title>
      <BestClassList />
    </BestClassContainer>
  );
}

export default BestClass;
