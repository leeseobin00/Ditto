import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserInfo from "../../../components/MyPage/UserInfo/UserInfo";
import axiosIntercepter from "../../../features/axiosIntercepter";
import AddressList from "../../../components/MyPage/UserInfo/AddressList";
import { useSelector } from "react-redux";

const Title = styled.h2`
  color: var(--PRIMARY);
  font-size: 20px;
  margin: 20px 0px;
`;

const PageContainer = styled.div`
  padding: 20px;
`;

const UserInfoDetail = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      axiosIntercepter
        .get(`/mypage/${userId}/normal`)
        .then((response) => {
          setUserData(response.data); // fileURL 데이터 가져옴
          setAddresses(response.data.addresses); // addresses 리스트 가져옴
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
          setIsLoading(false);
        });
    }
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageContainer>
        <Title>계정 정보</Title>
        <UserInfo userData={userData} />
        {/* <Title>배송지 목록</Title>
        <AddressList addresses={addresses} /> */}
      </PageContainer>
    </>
  );
};

export default UserInfoDetail;
