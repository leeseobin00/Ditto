// src/components/MyPage/LikedClasses.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: center;
`;

const ClassCard = styled.div`
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  padding: 20px;
  text-align: left;
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ClassImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 10px;
`;

const ClassName = styled.h3`
  color: var(--TEXT_PRIMARY);
  margin-bottom: 5px;
  font-size: 14px;
`;

const ClassDetail = styled.p`
  color: var(--TEXT_SECONDARY);
  margin: 0;
  font-size: 13px;
`;

const HeartIcon = styled.span`
  right: 10px;
  color: var(--RED);
  font-size: 13px;
  cursor: pointer;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  color: var(--SECONDARY);
  font-size: 14px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  color: var(--SECONDARY);
  font-size: 14px;
`;

const Group = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  width: 100%; 
  margin-top: 10px;
`;

const Tag = styled.div`
  color: var(--SECONDARY);
  border: 1px solid var(--SECONDARY);
  border-radius: 10px;
  padding: 5px;
  font-size: 13px;
`

const LikedClasses = ({ classes, onLikeCancel }) => {
  const navigate = useNavigate();

  const handleClassClick = (classId) => {
    navigate(`/classes/detail/${classId}`);
  };
  
  return (
    <Container>
      <ClassContainer>
        {classes.map((cls) => (
          <ClassCard key={cls.classId}>
            <ClassImage src={cls.fileUrl} alt={cls.className} onClick={() => handleClassClick(cls.classId)} />
            <ClassInfo>
              <ClassName>{cls.className}</ClassName>
              <Group>
                <ClassDetail>{`${cls.classHour}시간 | ${cls.nickname}`}</ClassDetail>
                <HeartIcon onClick={() => onLikeCancel(cls.classId)}>❤ {cls.likeCount}</HeartIcon>
              </Group>
              <Group>
                <Rating>★ {cls.ratingSum / 100} ({cls.reviewCount})</Rating>
                <Tag>{`${cls.tagName}`}</Tag>
                <Price>₩ {cls.classPrice}</Price>
              </Group>
            </ClassInfo>
          </ClassCard>
        ))}
      </ClassContainer>
    </Container>
  );
};

export default LikedClasses;
