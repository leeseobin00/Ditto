import { styled } from "styled-components";

import ClassListItem from "./ClassListItem";

const ClassListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClassListLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 10px 0;
`;

function ClassList({ classList }) {
  const itemsPerRow = 4;

  const rows = [];
  for (let i = 0; i < classList.length; i += itemsPerRow) {
    rows.push(classList.slice(i, i + itemsPerRow));
  }

  return (
    <ClassListContainer>
      {rows.map((row, rowIndex) => (
        <ClassListLine key={rowIndex}>
          {row.map((classInfo, index) => (
            <ClassListItem
              key={index}
              classInfo={classInfo}
              fileId={classInfo.file.fileId}
              instructor={classInfo.user.nickname}
              tag={classInfo.tag.tagName}
            />
          ))}
        </ClassListLine>
      ))}
    </ClassListContainer>
  );
}

export default ClassList;
