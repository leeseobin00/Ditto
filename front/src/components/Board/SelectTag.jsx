import { styled } from "styled-components";

const Tag = styled.div`
  border: 1px solid var(--SECONDARY);
  border-radius: 25px;
  padding: 4px 12px;
  font-weight: 600;
  color: var(--SECONDARY);
  background-color: ${(props) =>
    props.$active === "true" ? "var(--TERTIARY)" : "var(--LIGHT)"};
  white-space: nowrap;
  cursor: ${({ isedit }) => (isedit==="true" ? "not-allowed" : "pointer")};

  &:hover {
    background-color: var(--TERTIARY);
  }
`;

function SelectTag({ tags, curTag, handleTag, isedit }) {
  return (
    <>
      {tags.map((t, index) => (
        <Tag
          key={index}
          $active={t.value === curTag ? "true" : "false"}
          isedit={isedit}
          onClick={() => handleTag(t.value)}
        >
          {t.label}
        </Tag>
      ))}
    </>
  );
}

export default SelectTag;
