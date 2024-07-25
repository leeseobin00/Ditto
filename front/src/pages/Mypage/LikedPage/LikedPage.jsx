// src/pages/MyPage/LikedPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import LikedClasses from '../../../components/MyPage/Liked/LikedClasses';
import LikedUsers from '../../../components/MyPage/Liked/LikedUsers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  align-self: flex-start;
  color: var(--PRIMARY);
  font-size: 20px;
  margin: 20px 13px;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  background-color: var(--SECONDARY);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    filter: brightness(0.9);
  }
`;

// 더미 데이터 추가
const dummyClasses = [
  {
    classId: 1,
    className: '누구나 손쉽게 따라하는 피아노 입문 클래스',
    classPrice: 43000,
    classHour: 2,
    classMinute: 0,
    likeCount: 12234,
    reviewCount: 101,
    ratingSum: 480,
    userId: 1,
    nickname: '이강사',
    tagId: 1,
    tagName: '향수',
    fileId: 1,
    fileUrl: 'https://cdn.class101.net/images/d3f52048-c315-4f46-9420-586ec16ce7a7',
    likeClassId: 1,
    createdDate: '2024-07-18T12:34:56Z'
  },
  // 추가 더미 데이터...
];

const dummyUsers = [
  {
    userId: 1,
    nickname: '김디도',
    tags: [
      { tagId: 1, tagName: '향수' },
      { tagId: 2, tagName: '뜨개질' }
    ],
    fileId: 1,
    fileUrl: 'https://i.pinimg.com/originals/23/f8/99/23f899935c4ae47b8d99afbbf18ff75e.jpg',
    likeUserId: 1,
    createdDate: '2024-07-18T12:34:56Z'
  },
  // 추가 더미 데이터...
];

const LikedPage = () => {
  const { userId } = useSelector((state) => state.auth);
  const [likedClasses, setLikedClasses] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLikedItems();
  }, []);

  const fetchLikedItems = async () => {
    setLoading(true);
    try {
      // const response = await axios.get(`http://localhost:8080/mypage/${userId}/like/class`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //   }
      // });
      // setLikedClasses(response.data.classes);
      setLikedClasses(dummyClasses); // 더미 데이터 사용

      // const userResponse = await axios.get(`http://localhost:8080/mypage/${userId}/like/user`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //   }
      // });
      // setLikedUsers(userResponse.data.users);
      setLikedUsers(dummyUsers); // 더미 데이터 사용
    } catch (error) {
      console.error('Error fetching liked items:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreClasses = async () => {
    const finalDate = likedClasses[likedClasses.length - 1].createdDate;
    setLoading(true);
    try {
      // const response = await axios.get(`http://localhost:8080/mypage/${userId}/like/class?final-date=${finalDate}`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //   }
      // });
      // setLikedClasses((prevClasses) => [...prevClasses, ...response.data.classes]);
      setLikedClasses((prevClasses) => [...prevClasses, ...dummyClasses]); // 더미 데이터 추가
    } catch (error) {
      console.error('Error loading more classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreUsers = async () => {
    const finalDate = likedUsers[likedUsers.length - 1].createdDate;
    setLoading(true);
    try {
      // const response = await axios.get(`http://localhost:8080/mypage/${userId}/like/user?final-date=${finalDate}`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //   }
      // });
      // setLikedUsers((prevUsers) => [...prevUsers, ...response.data.users]);
      setLikedUsers((prevUsers) => [...prevUsers, ...dummyUsers]); // 더미 데이터 추가
    } catch (error) {
      console.error('Error loading more users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassLikeCancel = async (classId) => {
    try {
      // await axios.delete(`http://localhost:8080/mypage/${userId}/like/class/${classId}`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //   }
      // });
      setLikedClasses(likedClasses.filter((cls) => cls.classId !== classId));
    } catch (error) {
      console.error('Error cancelling class like:', error);
    }
  };

  const handleUserLikeCancel = async (cancelUserId) => {
    try {
      // await axios.delete(`http://localhost:8080/mypage/${userId}/like/user/${cancelUserId}`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //   }
      // });
      setLikedUsers(likedUsers.filter((user) => user.userId !== cancelUserId));
    } catch (error) {
      console.error('Error cancelling user like:', error);
    }
  };

  return (
    <Container>
      <Title>관심 Class</Title>
      <LikedClasses classes={likedClasses} onLikeCancel={handleClassLikeCancel} />
      <LoadMoreButton onClick={loadMoreClasses} disabled={loading}>
        {loading ? '불러오는 중...' : '더보기'}
      </LoadMoreButton>
      <Title>관심 User</Title>
      <LikedUsers users={likedUsers} onLikeCancel={handleUserLikeCancel} />
      <LoadMoreButton onClick={loadMoreUsers} disabled={loading}>
        {loading ? '불러오는 중...' : '더보기'}
      </LoadMoreButton>
    </Container>
  );
};

export default LikedPage;
