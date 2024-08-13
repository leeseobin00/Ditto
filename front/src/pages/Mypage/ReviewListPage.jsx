import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MyPageReviewList from "../../components/Review/MyPageReviewList";
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
  const [showMoreButton, setShowMoreButton] = useState(true);

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
      if (response?.data?.data.length < 3) setShowMoreButton(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoreReviews = async () => {
    if (reviewList.length === 0) return;

    const finalDate = reviewList[reviewList.length - 1].createdDate;

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

      if (response?.data?.data.length == 0) {
        setShowMoreButton(false);
        Swal.fire({
          text: "더 이상 불러올 리뷰가 없습니다.",
          icon: "info",
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        })
      } else if (response?.data?.data.length < 3) setShowMoreButton(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <Title>작성한 리뷰</Title>
      {reviewList.length > 0 ? (
        <MyPageReviewList
          reviewList={reviewList}
          fetchMoreReviews={fetchMoreReviews}
          onUpdate={fetchReviews}
          userId={userId}
          showMoreButton={showMoreButton}
        />
      ) : (
        <ReviewNull>작성한 리뷰가 없습니다.</ReviewNull>
      )}
    </PageContainer>
  );
};

export default ReviewListPage;
