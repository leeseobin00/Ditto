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

const LikedPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
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
      const response = await axios.get(
        `${baseURL}/mypage/${userId}/like/class`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setLikedClasses(response?.data?.data);

      const userResponse = await axios.get(
        `${baseURL}/mypage/${userId}/like/user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setLikedUsers(userResponse?.data?.data);
    } catch (error) {
      console.error("Error fetching liked items:", error);
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
      setLikedClasses((prevClasses) => [
        ...prevClasses,
        ...response?.data?.data,
      ]);
    } catch (error) {
      console.error("Error loading more classes:", error);
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
      setLikedUsers((prevUsers) => [...prevUsers, ...response.data.users]);
    } catch (error) {
      console.error("Error loading more users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassLikeCancel = async (classId) => {
    try {
      await axios.delete(`${baseURL}/mypage/${userId}/like/class/${classId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setLikedClasses(likedClasses.filter((cls) => cls.classId !== classId));
    } catch (error) {
      console.error("Error cancelling class like:", error);
    }
  };

  const handleUserLikeCancel = async (cancelUserId) => {
    try {
      await axios.delete(
        `${baseURL}/mypage/${userId}/like/user/${cancelUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setLikedUsers(likedUsers.filter((user) => user.userId !== cancelUserId));
    } catch (error) {
      console.error("Error cancelling user like:", error);
    }
  };

  return (
    <Container>
      <Title>관심 Class</Title>
      <LikedClasses
        classes={likedClasses}
        onLikeCancel={handleClassLikeCancel}
      />
      <MoreButton onClick={loadMoreClasses} disabled={loading} />
      <Title>관심 User</Title>
      <LikedUsers users={likedUsers} onLikeCancel={handleUserLikeCancel} />
      <MoreButton onClick={loadMoreUsers} disabled={loading} />
    </Container>
  );
};

export default LikedPage;
