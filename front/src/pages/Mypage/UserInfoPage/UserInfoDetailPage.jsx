import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import Swal from "sweetalert2";

import axiosIntercepter from "../../../features/axiosIntercepter";
import useAxios from "../../../hooks/useAxios";
import UserInfo from "../../../components/MyPage/UserInfo/UserInfo";
import AddressList from "../../../components/Address/AddressList";
import RoundButton from "../../../components/common/RoundButton";
import AddressPostModal from "../../../components/Address/AddressPostModal";

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

const AddressContainer = styled.div`
  width: 100%;
  padding: 20px;
  padding-right: 40px;
`;

const UserInfoDetail = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const { sendRequest } = useAxios();

  useEffect(() => {
    if (userId) {
      axiosIntercepter
        .get(`/mypage/${userId}/normal`)
        .then((response) => {
          setUserData(response?.data); // fileURL 데이터 가져옴
          setAddresses(response?.data?.data?.addresses); // addresses 리스트 가져옴
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to load user data!",
          });
        });
    }
  }, [userId]);

  const handleAddressModal = () => {
    setShowAddressModal(!showAddressModal);
    setIsEdit(false);
  };

  const handleGetAddresses = async () => {
    setIsEdit(false);
    try {
      const response = await sendRequest(
        `/mypage/${userId}/address`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
        "get"
      );
      setAddresses(response?.data?.addresses);
    } catch {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch addresses!",
      });
    }
  };

  const handleEditAddress = (address) => {
    setShowAddressModal(true);
    setIsEdit(true);
    setSelectedAddress(address);
  };

  if (isLoading) {
    return <Title style={{ margin: "20px" }}>Loading...</Title>;
  }

  return (
    <PageContainer>
      <Title>계정 정보</Title>
      <UserInfo userData={userData} />
      <TitleLine>
        <Title>배송지 목록</Title>
        <RoundButton label={"추가"} onClick={handleAddressModal} />
      </TitleLine>
      <AddressContainer>
        <AddressList
          addresses={addresses}
          userId={userId}
          onUpdate={handleGetAddresses}
          onEdit={handleEditAddress}
        />
      </AddressContainer>
      <AddressPostModal
        show={showAddressModal}
        onClose={handleAddressModal}
        userId={userId}
        onUpdate={handleGetAddresses}
        initialAddress={selectedAddress}
        isEdit={isEdit}
      />
    </PageContainer>
  );
};

export default UserInfoDetail;
