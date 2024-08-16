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
  min-width: 100%;
  overflow-x: auto;
  margin: 10px 0;

  /* 웹킷 기반 브라우저 커스텀 스크롤바 */
  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #afaeae;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
  }

  /* Firefox 커스텀 스크롤바 */
  scrollbar-width: thin;
  scrollbar-color: #ffffff #f1f1f1;
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
