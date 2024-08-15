import { styled, css } from "styled-components";

// CSS 변수에서 색상을 가져오는 함수
const getColor = (color) => `var(--${color})`;

// 버튼 스타일 정의
const colorStyle = css`
  ${({ color = "SECONDARY" }) => {
    if (color === "default") {
      return css`
        color: ${getColor("TEXT_PRIMARY")};
        border: 1px solid ${getColor("BORDER_COLOR")};

        &:hover {
          background-color: ${getColor(`BACKGROUND_COLOR`)};
        }

        &:active {
          background-color: ${getColor(`BACKGROUND_COLOR`)};
        }
      `;
    }

    if (color === "ACCENT1") {
      return css`
        color: ${getColor(`${color}`)};
        border: 1px solid ${getColor(`${color}`)};

        &:hover {
          background-color: ${getColor(`${color}_LIGHT`)};
        }

        &:active {
          background-color: ${getColor(`${color}_LIGHT`)};
        }
      `;
    }

    // 기본적으로 'md'일 때의 스타일 (default)
    return css`
      ${({ color = "SECONDARY" }) => css`
        color: ${getColor(`${color}`)};
        border: 1px solid ${getColor(`${color}`)};

        &:hover {
          background-color: ${getColor("TERTIARY")};
        }

        &:active {
          background-color: ${getColor(`TERTIARY`)};
        }
      `}
    `;
  }}
`;

const sizeStyle = css`
  ${({ size = "md" }) => {
    if (size === "sm") {
      return css`
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 500;
      `;
    }

    if (size === "lg") {
      return css`
        padding: 12px 48px;
        font-size: 16px;
      `;
    }

    if (size === "xl") {
      return css`
        padding: 12px 60px;
        font-size: 18px;
      `;
    }

    // 기본적으로 'md'일 때의 스타일 (default)
    return css`
      padding: 6px 20px;
      font-size: 14px;
    `;
  }}
`;

const ButtonBase = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  min-width: 64px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  background-color: var(--LIGHT);

  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* button의 Content를 선택할 수 없도록 한다.*/
  user-select: none;

  transition: background-color 0.1s ease;

  /* 배경색 스타일 적용 */
  ${colorStyle}
  /* 사이즈 스타일 적용 */
  ${sizeStyle}
`;

function OutlineButton({ color = "SECONDARY", size = "md", label, onClick }) {
  return (
    <ButtonBase color={color} size={size} onClick={onClick}>
      {label}
    </ButtonBase>
  );
}

export default OutlineButton;
