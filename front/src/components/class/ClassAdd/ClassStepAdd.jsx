import { styled } from "styled-components";

import AddButton from "./AddButton";
import ClassStepAddInput from "./ClassStepAddInput";

const ClassStepAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0;
  justify-content: center;
  align-items: center;
`;

function ClassStepAdd() {
  return (
    <ClassStepAddContainer>
      <ClassStepAddInput />
      <AddButton />
    </ClassStepAddContainer>
  );
}

export default ClassStepAdd;
