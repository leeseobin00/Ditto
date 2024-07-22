// src/pages/MyPage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axiosIntercepter from '../features/axiosIntercepter'; // 인터셉터 가져오기
import UserInfo from '../components/MyPage/UserInfo';
import AddressList from '../components/MyPage/AddressList';
import SidebarNav from '../components/MyPage/SidebarNav';

const Container = styled.div`
  display: flex;
  margin: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h2`
  color: var(--PRIMARY);
  font-size: 20px;
  margin: 20px 13px;
`;

const MyPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (userId) {
    //       axiosIntercepter.get(`/mypage/${userId}/normal`)
    //         .then(response => {
        //           setUserData(response.data); // fileURL 데이터 가져옴
        //           setAddresses(response.data.addresses); // addresses 리스트 가져옴
        //           setIsLoading(false);
        //         })
        //         .catch(error => {
            //           console.error('Error fetching data', error);
            //           setIsLoading(false);
            //         });
            //     }
            //   }, [userId]);
            const dummyUserData = {
              fileUrl: '',
              userId: 1,
              email: 'dummy@example.com',
              nickName: 'DummyNick',
            };

useEffect(() => {
    if (dummyUserData.userId) {
      const fetchUserData = async () => {
        try {
          // 더미 주소 데이터
          const dummyAddresses = [
            {
              addressId: 1,
              addressName: '집',
              zipCode: '06220',
              address1: '서울특별시 강남구 테헤란로 212',
              address2: '801호',
              phoneNumber: '010-1234-5678',
              receiver: '김디도',
              isDefault: true,
            },
            {
              addressId: 2,
              addressName: '회사',
              zipCode: '06220',
              address1: '서울특별시 강남구 테헤란로 212',
              address2: '801호',
              phoneNumber: '010-1234-5678',
              receiver: '김디도',
              isDefault: false,
            },
          ];
          setUserData(dummyUserData);
          setAddresses(dummyAddresses);
        } catch (error) {
          console.error('Error fetching data', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [dummyUserData.userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <SidebarNav />
      <Content>
        <Title>계정 정보</Title>
        <UserInfo userData={userData} />
        <Title>베송지 목록</Title>
        <AddressList addresses={addresses} />
      </Content>
    </Container>
  );
};

export default MyPage;
