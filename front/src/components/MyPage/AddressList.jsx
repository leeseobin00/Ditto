import React, { useState } from 'react';
import styled from 'styled-components';
import AddressModal from './AddressModal';

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
  background-color: var(--PRIMARY);
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
  color: var(--PRIMARY);
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
  background-color: ${(props) => (props.$delete ? 'var(--RED)' : 'var(--PRIMARY)')};
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const AddressList = ({ addresses }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleEdit = (address) => {
    setSelectedAddress(address);
  };

  const handleDelete = (addressId) => {
    // 삭제 로직을 추가하세요
    console.log(`삭제 클릭됨: ${addressId}`);
  };

  const handleAdd = () => {
    setSelectedAddress({});
  };

  const handleCloseModal = () => {
    setSelectedAddress(null);
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
        <AddressModal address={selectedAddress} onClose={handleCloseModal} />
      )}
    </AddressContainer>
  );
};

export default AddressList;
