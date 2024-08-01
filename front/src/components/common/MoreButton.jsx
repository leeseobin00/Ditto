import styled from "styled-components";

const ButtonContainer = styled.button`
  width: 150px;
  height: 30px;
  background-color: var(--LIGHT);
  border-style: solid;
  border-color: var(--BORDER_COLOR);
  border-radius: 25px;
  border-width: 1px;
  font-size: 15px;
  font-weight: 600;
  color: var(--TEXT_SECONDARY);
  margin: 10px auto;
  cursor: pointer;
  &:hover {
    background-color: var(--BACKGROUND_COLOR);
  }
  &:active {
    background-color: var(--BACKGROUND_COLOR);
  }
`;

function MoreButton({ onClick }) {
  return <ButtonContainer onClick={onClick}>더보기</ButtonContainer>;
}

export default MoreButton;
