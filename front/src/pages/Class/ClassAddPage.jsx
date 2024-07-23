import { styled } from "styled-components";

import ClassThumbnailAdd from "../../components/class/ClassAdd/ClassThumbnailAdd";

const ClassAddPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`

function ClassAdePage () {
  return (
    <ClassAddPageContainer>
      <ClassThumbnailAdd />
      <div>body</div>
    </ClassAddPageContainer>
  );
}

export default ClassAdePage;