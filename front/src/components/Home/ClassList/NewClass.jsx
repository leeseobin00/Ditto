import { styled } from "styled-components";

import NewClassList from "./NewClassList";

const NewClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  padding: 0 20px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
`;

function NewClass() {
  return (
    <NewClassContainer>
      <Title>New Class</Title>
      <NewClassList />
    </NewClassContainer>
  );
}

export default NewClass;
