import { styled } from "styled-components";

const AddContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: row;
  background-color: var(--TERTIARY);
  padding: 2%;
  border-radius: 10px;
  justify-content: space-between;
  margin: 10px 0;
`;
const StepNo = styled.div`
  background-color: var(--SECONDARY);
  width: 25px;
  height: 25px;
  color: var(--LIGHT);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 20px;
  font-weight: 600;
  margin-right: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function ClassStepAddInput() {
  return (
    <AddContainer>
      <StepNo>1</StepNo>
      <InputContainer>dd</InputContainer>
    </AddContainer>
  );
}

export default ClassStepAddInput;
