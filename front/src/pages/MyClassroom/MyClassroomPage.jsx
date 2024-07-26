import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ClassCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: ${(props) => (props.$isActive ? 'var(--PRIMARY_LIGHT)' : 'var(--BACKGROUND_LIGHT)')};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
`;

const ClassImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
    width: 100%;
    height: auto;
  }
`;

const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 500px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Icon = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ClassName = styled.div`
  font-weight: bold;
  color: var(--TEXT_PRIMARY);
`;

const TagName = styled.div`
  display: flex;
  color: var(--SECONDARY);
  border: 1px solid var(--SECONDARY);
  border-radius: 10px;
  padding: 3px 8px;
  font-size: 12px;
  margin: 10px 0;
  align-items: center;
  justify-content: center;
  width: 10%;
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
  font-size: 36px; /* 아이콘 크기를 늘리기 위해 font-size 조정 */
  margin-left: auto;
  cursor: pointer;
`;

const Title = styled.h2`
  color: var(--PRIMARY);
  font-size: 20px;
  margin: 20px 13px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin: 10px 5px;
  }
`;

const ClassInfoContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const MyClassroomPage = () => {
  const [classes, setClasses] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const nickname = useSelector((state) => state.auth.nickname);

  useEffect(() => {
    // 서버에서 데이터 가져오는 부분 주석 처리
    /*
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/mychatroom/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setClasses(response.data.classes);
      } catch (error) {
        console.error('Error fetching classroom data:', error);
      }
    };

    fetchData();
    */

    // 테스트를 위한 더미 데이터 설정
    const dummyData = [
      {
        fileUrl: 'https://via.placeholder.com/70',
        className: '누구나 손쉽게 따라하는 피아노 입문 클래스',
        tagName: '향수',
        userName: '이강사',
        chatroomState: 'active',
        openTime: '2024-07-11T20:00:00Z',
        url: 'https://google.com',
        chatroomId: 1,
      },
      {
        fileUrl: 'https://via.placeholder.com/70',
        className: '입문자도 바로 할 수 있는 2주 완성 그림의 기본기 클래스',
        tagName: '향초',
        userName: '이강사',
        chatroomState: 'inactive',
        openTime: '2024-07-28T18:00:00Z',
        url: 'https://daum.com',
        chatroomId: 2,
      },
      {
        fileUrl: 'https://via.placeholder.com/70',
        className: '오늘부터 나도 갓생! 독서 클래스',
        tagName: '비누',
        userName: '이강사',
        chatroomState: 'inactive',
        openTime: '2024-08-03T12:00:00Z',
        url: 'https://naver.com',
        chatroomId: 3,
      },
    ];

    // 더미 데이터를 상태로 설정
    setClasses(dummyData);
  }, []);

  const onVideoIconClick = async (classUrl) => {
    window.open(classUrl, '_blank'); // 새 창에서 받은 URL로 리디렉션
  };

  return (
    <Container>
      <Title>내 강의실</Title>
      {classes.map((classItem) => (
        <ClassCard key={classItem.url} $isActive={classItem.chatroomState === 'active'}>
          <ClassImage src={classItem.fileUrl} alt={classItem.className} />
          <ClassInfoContainer>
            <ClassInfo>
              <ClassName>{classItem.className}</ClassName>
              <TagName>{classItem.tagName}</TagName>
            </ClassInfo>
            <ClassInfo>
              <UserName>{classItem.userName}</UserName>
              <OpenTime>{new Date(classItem.openTime).toLocaleString()}</OpenTime>
            </ClassInfo>
            <Icon>
              {classItem.chatroomState === 'active' ? (
                <VideoIcon onClick={() => onVideoIconClick(classItem.url)}>
                  <FaVideo />
                </VideoIcon>
              ) : (
                <VideoIcon>
                  <FaVideoSlash />
                </VideoIcon>
              )}
            </Icon>
          </ClassInfoContainer>
        </ClassCard>
      ))}
    </Container>
  );
};

export default MyClassroomPage;
