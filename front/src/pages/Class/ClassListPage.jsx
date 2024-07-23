import { styled } from "styled-components";

import TabBar from "../../components/class/ClassList/TabBar";

const ClassPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function ClassListPage() {
  return (
    <ClassPageContainer>
      <TabBar />
      {/* <ClassList /> */}
    </ClassPageContainer>
  );
}

export default ClassListPage;
