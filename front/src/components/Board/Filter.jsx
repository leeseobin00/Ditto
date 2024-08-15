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
  width: 60px;
  margin-right: 4px;
`;

const FilterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Filter = ({ title, children }) => (
  <FilterWrapper>
    <FilterTitle>{title}</FilterTitle>
    <FilterContent>{children}</FilterContent>
  </FilterWrapper>
);

export default Filter;
