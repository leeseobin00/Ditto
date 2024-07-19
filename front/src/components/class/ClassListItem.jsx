// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import React from 'react';
import { styled } from "styled-components";

import ClassThumbnail from "../../assets/img/class-thumbnail-tmp.jpg";

const ClassListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 200px;
`;

const ClassDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function ClassListItem() {
  return (
    <ClassListItemContainer>
      <img src={ClassThumbnail} alt="Class Thumbnail" />
      <div>클래스 제목</div>
      <ClassDetail>
        <div>태그</div>
        <div>강사</div>
      </ClassDetail>
    </ClassListItemContainer>
  );
}

export default ClassListItem;
