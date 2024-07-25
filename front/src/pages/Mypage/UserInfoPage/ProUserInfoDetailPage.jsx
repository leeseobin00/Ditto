// src/pages/MyPage/ProUserinfoDetailPage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserInfo from '../../../components/MyPage/UserInfo/UserInfo';
import AccountDetail from '../../../components/MyPage/Account/AccountDetail';
import { useSelector } from 'react-redux';

const Title = styled.h2`
  color: var(--PRIMARY);
  font-size: 20px;
  margin: 20px 13px;
`;

const PageContainer = styled.div`
  padding: 20px;
`;

const ProUserinfoDetailPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (userId) {
  //     axiosIntercepter.get(`/mypage/pro/${userId}`)
  //       .then(response => {
  //         setUserData(response.data); // 사용자 데이터 가져옴
  //         setIsLoading(false);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching data', error);
  //         setIsLoading(false);
  //       });
  //   }
  // }, [userId]);

  // 테스트용 코드
  const dummyUserData = {
    email: 'ssafy@ssafy.com',
    nickname: 'ssafy',
    fileUrl: 'https://i.pinimg.com/originals/23/f8/99/23f899935c4ae47b8d99afbbf18ff75e.jpg',
    accountId: '123456',
    accountNumber: '123-456-7890',
    bank: '국민은행',
    receiver: '홍길동'
  };

  useEffect(() => {
    if (dummyUserData.accountId) {
      const fetchUserData = async () => {
        try {
          setUserData(dummyUserData);
        } catch (error) {
          console.error('Error fetching data', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [dummyUserData.accountId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Title>계정 정보</Title>
      <UserInfo userData={userData} />
      <Title>계좌 정보</Title>
      <AccountDetail accountData={userData} />
    </PageContainer>
  );
};

export default ProUserinfoDetailPage;
