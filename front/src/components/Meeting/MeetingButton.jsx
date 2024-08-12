import { styled, css } from "styled-components";

const sizeStyle = css`
  ${({ size = "md" }) => {
    if (size === "sm") {
      return css`
        padding: 6px 8px;
        font-size: 14px;
        font-weight: 500;
      `;
    }

    if (size === "lg") {
      return css`
        padding: 12px 48px;
        font-size: 18px;
        font-weight: 600;
      `;
    }

    if (size === "xl") {
      return css`
        padding: 12px 60px;
        font-size: 18px;
        font-weight: 600;
      `;
    }

    // 기본적으로 'md'일 때의 스타일 (default)
    return css`
      padding: 6px 8px;
      font-size: 16px;
      font-weight: 500;
    `;
  }}
`;

const Button = styled.button`
  background-color: var(--MEETING_BACKGROUND);
  color: var(--LIGHT);
  border: none;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;

  /* 사이즈 스타일 적용 */
  ${sizeStyle}

  &:hover {
    background-color: #666;
    color: var(--SECONDARY);
  }
`;

function MeetingButton({ size = "md", label, onClick }) {
  return (
    <Button size={size} onClick={onClick}>
      {label}
    </Button>
  );
}

export default MeetingButton;
