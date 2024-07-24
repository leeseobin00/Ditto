import { styled, css } from "styled-components";
import Add from "../../../assets/icon/common/plus.png";

const sizeStyle = css`
  ${({ size = "md" }) => {
    if (size === "sm") {
      return css`
        width: 25px;
        height: 25px;
      `;
    }

    // 기본적으로 'md'일 때의 스타일 (default)
    return css`
      width: 35px;
      height: 35px;
    `;
  }}
`;

const ButtonContainer = styled.button`
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

  ${sizeStyle}
`;

const AddIcon = styled.img`
  width: 18px;
  height: 18px;
`;

function AddButton({ size = "md", onClick }) {
  return (
    <ButtonContainer size={size} onClick={onClick}>
      <AddIcon src={Add} alt="add-icon" size={size} />
    </ButtonContainer>
  );
}

export default AddButton;
