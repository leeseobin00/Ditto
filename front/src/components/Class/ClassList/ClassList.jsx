import { styled } from "styled-components";

import ClassListItem from "./ClassListItem";

const ClassListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClassListLine = styled.div`
  display: flex;
  flex-direction: row;
`;

function ClassList({ classList }) {
  return (
    <ClassListContainer>
      {classList.map((classInfo, index) => (
        <ClassListItem
          key={index}
          classInfo={classInfo}
          fileId={classInfo.file.fileId}
          instructor={classInfo.user.nickname}
          tag={classInfo.tag.tagName}
        />
      ))}
    </ClassListContainer>
  );
}

export default ClassList;
