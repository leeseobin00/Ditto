import { styled } from "styled-components";

import ClassInfo from "./ClassInfo";

const ClassContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

function ClassContent({ classInfo }) {
  return (
    <ClassContentContainer>
      <ClassInfo classInfo={classInfo} />
    </ClassContentContainer>
  );
}

export default ClassContent;
