import React, { useState } from 'react';
import styled from 'styled-components';
import AddressModal from './AddressModal';
import axiosIntercepter from '../../../features/axiosIntercepter'; // axiosIntercepter 가져오기
import { useSelector } from 'react-redux'; // redux state에서 userId 가져오기

const AddressContainer = styled.div`
  margin-top: 40px;
`;

const AddressHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

const AddressTitle = styled.h2`
  color: var(--PRIMARY);
  font-size: 20px;
  margin: 20px 0;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: var(--SECONDARY);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const AddressItem = styled.div`
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  padding: 20px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddressDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const AddressName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const AddressInfo = styled.div`
  margin-bottom: 5px;
`;

const AddressPhone = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const PhoneIcon = styled.span`
  margin-right: 5px;
`;

const AddressReceiver = styled.div`
  margin-bottom: 5px;
`;

const AddressDefault = styled.div`
  font-weight: bold;
  color: var(--TITLE);
  margin-bottom: 5px;
`;

const AddressActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  margin: 5px;
  color: ${(props) => (props.$delete ? 'var(--RED)' : 'var(--SECONDARY)')};
  background-color: white;
  border: none;
  border-radius: 15px;
  border: 1px solid var(--BORDER_COLOR);
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const AddressList = ({ addresses, setAddresses }) => {
  const { userId } = useSelector((state) => state.auth);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleEdit = (address) => {
    setSelectedAddress(address);
  };

  const handleDelete = async (addressId) => {
    try {
      const response = await axiosIntercepter.delete(`/mypage/${userId}/address/${addressId}`);
      if (response.status === 200) {
        setAddresses((prevAddresses) => prevAddresses.filter((address) => address.addressId !== addressId));
        alert('삭제 성공');
      } else {
        alert('삭제 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(`삭제 실패: ${addressId}`, error);
      alert('삭제 실패. 다시 시도해주세요.');
    }
  };

  const handleAdd = () => {
    setSelectedAddress({});
  };

  const handleCloseModal = () => {
    setSelectedAddress(null);
  };

  const handleSave = (savedAddress) => {
    if (selectedAddress.addressId) {
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address.addressId === savedAddress.addressId ? savedAddress : address
        )
      );
    } else {
      setAddresses((prevAddresses) => [...prevAddresses, savedAddress]);
    }
  };

  return (
    <AddressContainer>
      {addresses.map((address) => (
        <AddressItem key={address.addressId}>
          <AddressDetails>
            <AddressName>{address.addressName}</AddressName>
            <AddressInfo>{address.zipCode}</AddressInfo>
            <AddressInfo>{address.address1}</AddressInfo>
            <AddressInfo>{address.address2}</AddressInfo>
          </AddressDetails>
          <AddressDetails>
            <AddressPhone>
              <PhoneIcon>📞</PhoneIcon>{address.phoneNumber}
            </AddressPhone>
            <AddressReceiver>{address.receiver}</AddressReceiver>
            {address.isDefault && <AddressDefault>기본 배송지</AddressDefault>}
          </AddressDetails>
          <AddressActions>
            <ActionButton onClick={() => handleEdit(address)}>수정</ActionButton>
            <ActionButton $delete onClick={() => handleDelete(address.addressId)}>삭제</ActionButton>
          </AddressActions>
        </AddressItem>
      ))}
      <AddressHeader>
        <AddButton onClick={handleAdd}>추가</AddButton>
      </AddressHeader>
      {selectedAddress && (
        <AddressModal address={selectedAddress} onClose={handleCloseModal} onSave={handleSave} />
      )}
    </AddressContainer>
  );
};

export default AddressList;
