import { styled } from "styled-components";
import Add from "../../../assets/icon/common/plus.png";

const ButtonContainer = styled.button`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  background-color: var(--SECONDARY);
  border: none;
  border-radius: 25px;
  z-index: 1;
  cursor: pointer;

  &:hover {
    background-color: var(--SECONDARY_DARK);
  }

  &:active {
    background-color: var(--SECONDARY_DARK);
  }
`;

const AddIcon = styled.img`
  width: 27px;
  height: 27px;
`;

function AddButton({ onClick }) {
  return (
    <ButtonContainer onClick={onClick}>
      <AddIcon src={Add} alt="add-icon" />
    </ButtonContainer>
  );
}

export default AddButton;
