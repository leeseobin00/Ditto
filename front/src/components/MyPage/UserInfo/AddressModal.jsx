import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import PostcodeModal from './PostCodeModal';
import {formatPhoneNumber } from '../../../utils/formatPhoneNumber';
import axiosIntercepter from '../../../features/axiosIntercepter';
import { useSelector } from 'react-redux';

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

const ModalContainer = styled.div`
  position: relative;
  background: var(--LIGHT);
  padding: 40px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  transition: all 0.3s ease-in-out;
  transform: translateY(0);
  opacity: 1;
`;

const CustomCloseIcon = styled(MdClose)`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  font-size: 32px;
  color: var(--SECONDARY);
  &:hover {
    color: var(--SECONDARY_DARK);
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
  background-color: var(--SECONDARY);
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
  background-color: var(--WHITE);
  color: var(--PRIMARY);
  font-weight: bold;
  border: 1px solid var(--BORDER_COLOR);
  border: none;
  box-shadow: 0 px 8px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  &:hover {
    filter: brightness(0.9);
  }
`;

const ErrorMessage = styled.div`
  color: var(--RED);
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
`;

const AddressModal = ({ address, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    addressName: '',
    zipCode: '',
    address1: '',
    address2: '',
    phoneNumber: '',
    receiver: '',
    isDefault: false,
  });

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [error, setError] = useState('');
  const { userId } = useSelector((state) => state.auth);

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

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: formattedPhoneNumber,
    }));
  };

  const validateForm = () => {
    const { addressName, zipCode, address1, address2, phoneNumber, receiver } = formData;
    if (!addressName || !zipCode || !address1 || !address2 || !phoneNumber || !receiver) {
      setError('모든 값을 정확히 입력해주세요.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      let response;
      if (address.addressId) {
        // 주소 수정 (PATCH 요청)
        response = await axiosIntercepter.patch(`/mypage/${userId}/address/${address.addressId}`, formData);
      } else {
        // 주소 추가 (POST 요청)
        response = await axiosIntercepter.post(`/mypage/${userId}/address`, formData);
      }
      if (response.status === 200) {
        alert('저장 성공!');
        onSave(response.data); // 저장 후 부모 컴포넌트에 데이터 전달
      } else {
        alert('저장 실패. 다시 시도해주세요.');
      }
      onClose();
    } catch (error) {
      console.error('저장 에러:', error);
      alert('저장 실패. 다시 시도해주세요.');
    }
  };

  const handleComplete = useCallback((data) => {
    setFormData((prevData) => ({
      ...prevData,
      zipCode: data.zonecode,
      address1: data.address,
    }));
    setIsPostcodeOpen(false);
  }, []);

  return (
    <>
      {isPostcodeOpen && (
        <PostcodeModal onComplete={handleComplete} onClose={() => setIsPostcodeOpen(false)} />
      )}
      <Overlay onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <CustomCloseIcon onClick={onClose} />
          <Title>{address.addressId ? '배송지 수정' : '배송지 추가'}</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
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
              <SearchButton type="button" onClick={() => setIsPostcodeOpen(true)}>
                우편번호 검색
              </SearchButton>
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
              placeholder='숫자만 입력하세요'
              onChange={handlePhoneNumberChange}
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
    </>
  );
};

export default AddressModal;
