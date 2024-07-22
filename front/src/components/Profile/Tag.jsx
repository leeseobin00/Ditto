import { styled } from "styled-components";

const TagWrapper = styled.div`
  border: 1px solid var(--SECONDARY);
  border-radius: 25px;
  padding: 4px 12px;
  font-weight: 600;
  font-size: 14px;
  color: var(--SECONDARY);
  background-color: var(--LIGHT);
  white-space: nowrap;
`;

function Tag({ tagName }) {
  return <TagWrapper>{tagName}</TagWrapper>;
}

export default Tag;
