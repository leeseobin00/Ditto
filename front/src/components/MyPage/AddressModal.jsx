import React, { useState, useEffect } from 'react';
import { styled } from "styled-components";
import { MdClose } from "react-icons/md";

// 오버레이 스타일 정의
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

// 모달 컨테이너 스타일 정의
const ModalContainer = styled.div`
  position: relative;
  background: var(--LIGHT);
  padding: 40px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;

  // 모달 애니메이션 (옵션)
  transition: all 0.3s ease-in-out;
  transform: translateY(0);
  opacity: 1;
`;

// 커스텀 아이콘 스타일 정의
const CustomCloseIcon = styled(MdClose)`
  position: absolute; // 절대 위치 설정
  top: 16px; // 상단에서 16px 떨어진 위치
  right: 16px; // 오른쪽에서 16px 떨어진 위치
  cursor: pointer;
  font-size: 32px; // 아이콘 크기
  color: var(--SECONDARY); // 아이콘 색상

  &:hover {
    color: var(--SECONDARY_DARK); // 호버시 색상
  }
`;

const Title = styled.h2`
  color: var(--PRIMARY);
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--TEXT_SECONDARY);
`;

const TextInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: var(--PRIMARY);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    filter: brightness(0.9);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const CheckboxInput = styled.input`
  margin-right: 5px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: var(--PRIMARY);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  &:hover {
    filter: brightness(0.9);
  }
`;

const AddressModal = ({ address, onClose }) => {
  const [formData, setFormData] = useState({
    addressName: '',
    zipCode: '',
    address1: '',
    address2: '',
    phoneNumber: '',
    receiver: '',
    isDefault: false,
  });

  useEffect(() => {
    if (address) {
      setFormData({
        addressName: address.addressName || '',
        zipCode: address.zipCode || '',
        address1: address.address1 || '',
        address2: address.address2 || '',
        phoneNumber: address.phoneNumber || '',
        receiver: address.receiver || '',
        isDefault: address.isDefault || false,
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    // 저장 로직
    console.log('저장 클릭됨', formData);
    onClose(); // 모달 닫기
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CustomCloseIcon onClick={onClose} />
        <Title>{address.addressId ? '배송지 수정' : '배송지 추가'}</Title>
        <FormGroup>
          <InputLabel>배송지명</InputLabel>
          <TextInput
            name="addressName"
            value={formData.addressName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel>우편번호</InputLabel>
          <Row>
            <TextInput
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
            <SearchButton>우편번호 검색</SearchButton>
          </Row>
        </FormGroup>
        <FormGroup>
          <TextInput
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            placeholder="주소"
          />
        </FormGroup>
        <FormGroup>
          <TextInput
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            placeholder="상세 주소 입력"
          />
        </FormGroup>
        <FormGroup>
          <InputLabel>연락처</InputLabel>
          <TextInput
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel>수령인</InputLabel>
          <TextInput
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
          />
        </FormGroup>
        <CheckboxLabel>
          <CheckboxInput
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
          />
          기본 배송지로 설정
        </CheckboxLabel>
        <SaveButton onClick={handleSave}>
          {address.addressId ? '수정' : '추가'}
        </SaveButton>
      </ModalContainer>
    </Overlay>
  );
};

export default AddressModal;
