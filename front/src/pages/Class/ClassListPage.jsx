import { styled } from "styled-components";

import TabBar from "../../components/class/TabBar";
import ClassList from "../../components/class/ClassList/ClassList";

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
