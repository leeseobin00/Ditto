import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewList from "../../components/MyPage/Review/ReviewList";
import styled from "styled-components";
import axios from "axios";

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

const PageContainer = styled.div`
  padding: 20px;
`;

const ReviewNull = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
  padding: 40px;
  text-align: center;
`;

const ReviewListPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { userId } = useSelector((state) => state.auth);
  const [reviewList, setReviewList] = useState([]);
  const [finalDate, setFinalDate] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${baseURL}/mypage/${userId}/review`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setReviewList(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoreReviews = async () => {
    if (reviews.length === 0) return;

    const finalDate = reviews[reviews.length - 1].createdDate;

    try {
      const response = await axios.get(
        `${baseURL}/mypage/${userId}/review-more?final-date=${finalDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setReviewList((prevReviewList) => [
        ...prevReviewList,
        ...response?.data?.data,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <Title>작성한 리뷰</Title>
      {reviewList.length > 0 ? (
        <ReviewList
          reviewList={reviewList}
          setReviewList={setReviewList}
          fetchMoreReviews={fetchMoreReviews}
        />
      ) : (
        <ReviewNull>작성한 리뷰가 없습니다.</ReviewNull>
      )}
    </PageContainer>
  );
};

export default ReviewListPage;
