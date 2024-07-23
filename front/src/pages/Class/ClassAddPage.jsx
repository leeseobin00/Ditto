import { styled } from "styled-components";

import ClassThumbnailAdd from "../../components/Class/ClassAdd/ClassThumbnailAdd";
import ClassInfoAdd from "../../components/Class/ClassAdd/ClassInfoAdd";

const ClassAddPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClassAddBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5%;
`;

function ClassAdePage() {
  return (
    <ClassAddPageContainer>
      <ClassThumbnailAdd />
      <ClassAddBody>
        <ClassInfoAdd />
      </ClassAddBody>
    </ClassAddPageContainer>
  );
}

export default ClassAdePage;
