import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const ClassCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: ${(props) => (props.isActive ? 'var(--PRIMARY_LIGHT)' : 'var(--BACKGROUND_LIGHT)')};
`;

const ClassImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin-right: 20px;
`;

const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ClassName = styled.div`
  font-weight: bold;
  color: var(--TEXT_PRIMARY);
`;

const TagName = styled.div`
  color: var(--SECONDARY);
  border: 1px solid var(--SECONDARY);
  border-radius: 10px;
  padding: 5px;
  font-size: 13px;
  margin-bottom: 10px;
  `;

const UserName = styled.div`
  color: var(--TEXT_SECONDARY);
  margin-top: 5px;
`;

const OpenTime = styled.div`
  color: var(--TEXT_SECONDARY);
  margin-top: 5px;
`;

const VideoIcon = styled.div`
  color: var(--SECONDARY);
  font-size: 24px;
  margin-left: auto;
`;

const MyClassroomDetail = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/mychatroom/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setClasses(response.data.classes);
      } catch (error) {
        setError('강의실 정보를 불러오는데 실패했습니다.');
        console.error(error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <Container>
      {error && <div>{error}</div>}
      {classes.map((classItem) => (
        <ClassCard key={classItem.url} isActive={classItem.chatroomState === 'active'}>
          <ClassImage src={classItem.fileUrl} alt={classItem.className} />
          <ClassInfo>
            <ClassName>{classItem.className}</ClassName>
            <TagName>{classItem.tagName}</TagName>
            <UserName>{classItem.userName}</UserName>
            <OpenTime>{new Date(classItem.openTime).toLocaleString()}</OpenTime>
          </ClassInfo>
          {classItem.chatroomState === 'active' && <VideoIcon>🎥</VideoIcon>}
        </ClassCard>
      ))}
    </Container>
  );
};

export default MyClassroomDetail;
