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
  const itemsPerRow = 4;
  const totalItems = 12;

  // 총 12개의 아이템만 렌더링하도록 슬라이싱
  const limitedClassList = classList.slice(0, totalItems);

  // 4개씩 나눠서 배열을 생성
  const rows = [];
  for (let i = 0; i < limitedClassList.length; i += itemsPerRow) {
    rows.push(limitedClassList.slice(i, i + itemsPerRow));
  }

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
