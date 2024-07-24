import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReviewList from '../../../components/MyPage/Review/ReviewList';

// 더미 데이터
const dummyReviews = [
  {
    reviewId: 1,
    reviewContent: '이 강의는 매우 유익하고 체계적으로 잘 구성되어 있습니다.',
    createdDate: '2024-07-21T12:34:56Z',
    modifiedDate: '2024-07-22T12:34:56Z',
    isDeleted: false,
    rating: 5,
    fileId: 1,
    fileUrl: '/path/to/image1.jpg',
    classId: 101,
    className: '오늘부터 나도 갓생! 독서 클래스',
    lectureId: 201,
    year: 2024,
    month: 8,
    day: 3,
    hour: 12,
    minute: 0,
  },
  {
    reviewId: 2,
    reviewContent: '강사님의 깊은 지식과 풍부한 경험을 바탕으로 한 강의입니다.',
    createdDate: '2024-07-20T12:34:56Z',
    modifiedDate: '2024-07-21T12:34:56Z',
    isDeleted: false,
    rating: 3.5,
    fileId: 2,
    fileUrl: '/path/to/image2.jpg',
    classId: 102,
    className: '입문자도 바로 할 수 있는 2주 완성 그림의 기본기 클래스',
    lectureId: 202,
    year: 2024,
    month: 7,
    day: 20,
    hour: 12,
    minute: 30,
  },
];

const ReviewListPage = () => {
  const { userId } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState([]);
  const [finalDate, setFinalDate] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // 서버와 통신하는 부분 주석 처리
      // const response = await axios.get(`https://localhost:8080/mypage/${userId}/review`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      //   },
      // });
      // const reviewData = response.data.reviews;
      const reviewData = dummyReviews; // 더미 데이터 사용
      setReviews(reviewData);
      setFinalDate(reviewData[reviewData.length - 1].createdDate);
    } catch (error) {
      alert('리뷰 목록 조회 실패. 다시 시도해주세요.');
      console.error('리뷰 목록 조회 에러:', error);
    }
  };

  const fetchMoreReviews = async () => {
    try {
      // 서버와 통신하는 부분 주석 처리
      // const response = await axios.get(`https://localhost:8080/mypage/${userId}/review-more`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      //   },
      //   params: {
      //     finalDate: finalDate,
      //   },
      // });
      // const reviewData = response.data.reviews;
      const reviewData = dummyReviews; // 더미 데이터 사용
      setReviews((prevReviews) => [...prevReviews, ...reviewData]);
      setFinalDate(reviewData[reviewData.length - 1].createdDate);
    } catch (error) {
      alert('리뷰 목록 조회 실패. 다시 시도해주세요.');
      console.error('리뷰 목록 조회 에러:', error);
    }
  };

  const handleEdit = (reviewId) => {
    // 편집 페이지로 이동
  };

  const handleClassClick = (classId) => {
    // 클래스 상세 페이지로 이동
  };

  return (
    <ReviewList
      reviews={reviews}
      fetchMoreReviews={fetchMoreReviews}
      handleEdit={handleEdit}
      handleClassClick={handleClassClick}
    />
  );
};

export default ReviewListPage;
