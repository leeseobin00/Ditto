import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import LikedClasses from "../../components/MyPage/Liked/LikedClasses";
import LikedUsers from "../../components/MyPage/Liked/LikedUsers";
import axios from "axios";
import MoreButton from "../../components/common/MoreButton";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const LikedNull = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
  padding: 40px;
  text-align: center;
`;

const LikedPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { userId } = useSelector((state) => state.auth);
  const [likedClasses, setLikedClasses] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showClassMoreButton, setShowClassMoreButton] = useState(false);
  const [showUserMoreButton, setShowUserMoreButton] = useState(false);

  useEffect(() => {
    fetchLikedItems();
  }, []);

  const fetchLikedItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/mypage/${userId}/like/class`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setLikedClasses(response?.data?.data);
      if (response?.data?.data.length == 3) setShowClassMoreButton(true);

      const userResponse = await axios.get(
        `${baseURL}/mypage/${userId}/like/user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setLikedUsers(userResponse?.data?.data);
      if (userResponse?.data?.data.length == 4) setShowUserMoreButton(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreClasses = async () => {
    const finalDate = likedClasses[likedClasses.length - 1].createdDate;
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/mypage/${userId}/like/class-more?final-date=${finalDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response?.data?.data.length == 0) {
        Swal.fire({
          text: "더 이상 불러올 관심 클래스가 없습니다.",
          icon: "info",
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
        setShowClassMoreButton(false);
      }
      if (response?.data?.data.length < 3) setShowClassMoreButton(false);
      setLikedClasses((prevClasses) => [
        ...prevClasses,
        ...response?.data?.data,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreUsers = async () => {
    const finalDate = likedUsers[likedUsers.length - 1].createdDate;
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/mypage/${userId}/like/user-more?final-date=${finalDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response?.data?.data.length == 0) {
        Swal.fire({
          text: "더 이상 불러올 관심 유저가 없습니다.",
          icon: "info",
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        });
        setShowUserMoreButton(false);
      } else if (response?.data?.data.length < 4) setShowUserMoreButton(false);
      setLikedUsers((prevUsers) => [...prevUsers, ...response?.data?.data]);
    } catch (error) {
      console.error("Error loading more users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>관심 Class</Title>
      <ContentContainer>
        {likedClasses.length == 0 && (
          <LikedNull>좋아요한 클래스가 없습니다.</LikedNull>
        )}
        <LikedClasses classes={likedClasses} />
        {showClassMoreButton && (
          <MoreButton onClick={loadMoreClasses} disabled={loading} />
        )}
      </ContentContainer>
      <Title>관심 User</Title>
      <ContentContainer>
        {likedUsers.length == 0 && (
          <LikedNull>좋아요한 유저가 없습니다.</LikedNull>
        )}
        <LikedUsers users={likedUsers} />
        {showUserMoreButton && (
          <MoreButton onClick={loadMoreUsers} disabled={loading} />
        )}
      </ContentContainer>
    </Container>
  );
};

export default LikedPage;
