import { styled } from "styled-components";

const ClassListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function ClassList() {
  return (
    <ClassListContainer>
      <div>클래스 목록</div>
    </ClassListContainer>
  );
}

export default ClassList;
