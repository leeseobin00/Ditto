import React from "react";
import styled from "styled-components";
import ClassListItem from "../../Class/ClassList/ClassListItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  overflow: auto;
`;

const LikedClasses = ({ classes }) => {
  return (
    <Container>
      <ClassContainer>
        {classes.map((classInfo, index) => (
          <ClassListItem
            key={index}
            classInfo={classInfo}
            fileId={classInfo?.fileId}
            instructor={classInfo?.nickname}
            tag={classInfo?.tagName}
            isMyPage={true}
          />
        ))}
      </ClassContainer>
    </Container>
  );
};

export default LikedClasses;
