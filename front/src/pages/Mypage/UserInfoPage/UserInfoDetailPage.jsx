import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

import axiosIntercepter from "../../../features/axiosIntercepter";
import UserInfo from "../../../components/MyPage/UserInfo/UserInfo";
import AddressList from "../../../components/Address/AddressList";
import RoundButton from "../../../components/common/RoundButton";
import AddressModal from "../../../components/Address/AddressModal";

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

const TitleLine = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-right: 20px;
`;

const PageContainer = styled.div`
  padding: 20px;
`;

const UserInfoDetail = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    if (userId) {
      axiosIntercepter
        .get(`/mypage/${userId}/normal`)
        .then((response) => {
          console.log(response?.data);
          setUserData(response?.data); // fileURL 데이터 가져옴
          setAddresses(response?.data?.addresses); // addresses 리스트 가져옴
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [userId]);

  const handleAddressModal = () => {
    setShowAddressModal(!showAddressModal);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Title>계정 정보</Title>
      <UserInfo userData={userData} />
      <TitleLine>
        <Title>배송지 목록</Title>
        <RoundButton label={"추가"} onClick={handleAddressModal} />
      </TitleLine>
      <AddressList addresses={addresses} />
      <AddressModal
        show={showAddressModal}
        onClose={handleAddressModal}
        userId={userId}
      />
    </PageContainer>
  );
};

export default UserInfoDetail;
