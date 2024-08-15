import { styled } from "styled-components";

const PageButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

const PageButton = styled.button`
  padding: 6px 10px;
  margin: 0 5px;
  background-color: ${(props) =>
    props.$active === "true" ? "var(--SECONDARY)" : "var(--LIGHT)"};
  color: ${(props) =>
    props.$active === "true" ? "var(--LIGHT)" : "var(--TEXT_SECONDARY)"};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: ${(props) =>
      props.$active === "true" ? "var(--SECONDARY_DARK)" : "var(--LIGHT)"};
  }
`;

function PaginationBar({ pageNumbers, currentPage, handleClick }) {
  return (
    <PageButtons>
      {pageNumbers?.map((number) => (
        <PageButton
          key={number}
          $active={number === currentPage ? "true" : "false"}
          onClick={() => handleClick(number)}
        >
          {number}
        </PageButton>
      ))}
    </PageButtons>
  );
}

export default PaginationBar;
