import { styled } from "styled-components";

import ClassListItem from "../class/ClassListItem";

const BestClassListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function BestClassList() {
  return (
    <BestClassListContainer>
      <ClassListItem />
    </BestClassListContainer>
  );
}

export default BestClassList;
