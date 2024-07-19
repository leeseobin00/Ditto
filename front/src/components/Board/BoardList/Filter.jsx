import { styled } from "styled-components";

const FilterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`;

const FilterTitle = styled.p`
  white-space: nowrap;
  margin-right: 8px;
`;

const Filter = ({ title, children }) => (
  <FilterWrapper>
    <FilterTitle>{title}</FilterTitle>
    {children}
  </FilterWrapper>
);

export default Filter;
