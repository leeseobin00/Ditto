// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";

const ClassListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
`;

function ClassListItem() {
  return (
    <ClassListItemContainer>
      <div>이미지</div>
      <div>클래스 제목</div>
      <div>
        <div>태그</div>
        <div>강사</div>
      </div>
    </ClassListItemContainer>
  );
}

export default ClassListItem;
