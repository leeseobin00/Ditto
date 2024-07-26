import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReviewList from '../../../components/MyPage/Review/ReviewList';
import styled from 'styled-components';
import axios from 'axios';

const Title = styled.h2`
  color: var(--PRIMARY);
  font-size: 20px;
  margin: 20px 13px;
`;

const PageContainer = styled.div`
  padding: 20px;
`;

const ReviewListPage = () => {
  const { userId } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState([]);
  const [finalDate, setFinalDate] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/mypage/${userId}/review`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const reviewData = response.data.reviews;
      setReviews(reviewData);
      setFinalDate(reviewData[reviewData.length - 1].createdDate);
    } catch (error) {
      alert('리뷰 목록 조회 실패. 다시 시도해주세요.');
      console.error('리뷰 목록 조회 에러:', error);
    }
  };

  const fetchMoreReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/mypage/${userId}/review-more?final-date=${finalDate}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const reviewData = response.data.reviews;
      setReviews((prevReviews) => [...prevReviews, ...reviewData]);
      setFinalDate(reviewData[reviewData.length - 1].createdDate);
    } catch (error) {
      alert('리뷰 목록 조회 실패. 다시 시도해주세요.');
      console.error('리뷰 목록 조회 에러:', error);
    }
  };

  return (
    <PageContainer>
      <Title>작성한 리뷰</Title>
      <ReviewList
        reviews={reviews}
        fetchMoreReviews={fetchMoreReviews}
      />
    </PageContainer>
  );
};

export default ReviewListPage;
