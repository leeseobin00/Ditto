import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserInfo from "../../../components/MyPage/UserInfo/UserInfo";
import AccountDetail from "../../../components/MyPage/Account/AccountDetail";
import { useSelector } from "react-redux";
import axios from "axios";

const PageContainer = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

const ProUserinfoDetailPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (userId) {
      axios
        .get(`${baseURL}/mypage/pro/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          setUserData(response?.data); // 사용자 데이터 가져옴
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [userId]);

  if (isLoading) {
    return <Title style={{ margin: "20px" }}>Loading...</Title>;
  }

  return (
    <PageContainer>
      <Title>계정 정보</Title>
      <UserInfo userData={userData} />
      <Title>계좌 정보</Title>
      <AccountDetail accountData={userData?.data} />
    </PageContainer>
  );
};

export default ProUserinfoDetailPage;
