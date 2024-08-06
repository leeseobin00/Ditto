import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axiosIntercepter from "../../features/axiosIntercepter";
import Modal from "../common/Modal";
import AddressInput from "./AddressInput";
import OutlineButton from "../common/OutlineButton";

const Title = styled.div`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  margin-top: 30px;
  margin-bottom: 40px;
  justify-content: space-between;
`;

const ErrorMessage = styled.div`
  color: var(--RED);
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
`;

const AddressAddModal = ({
  show,
  initialAddress,
  onClose,
  onSubmit,
  userId,
  isEdit = false,
}) => {
  const [addressData, setAddressData] = useState(initialAddress || {});

  const handleAddressData = useCallback((data) => {
    setAddressData((prev) => ({ ...prev, ...data }));
  }, []);

  const validateForm = () => {
    const { addressName, zipCode, address1, address2, phoneNumber, receiver } =
      addressData;
    if (
      !addressName ||
      !zipCode ||
      !address1 ||
      !address2 ||
      !phoneNumber ||
      !receiver
    ) {
      alert("모든 값을 정확히 입력해주세요.");
      return false;
    }
    return true;
  };

  const handlePostAddress = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (addressData?.addressId) {
        await axiosIntercepter.patch(
          `/mypage/${userId}/address/${addressData.addressId}`,
          addressData
        );
      } else {
        // 주소 추가 (POST 요청)
        await axiosIntercepter.post(`/mypage/${userId}/address`, addressData);
      }
      alert("배송지 등록이 완료되었습니다.");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    show && (
      <Modal onClose={onClose}>
        <Title>배송지 입력</Title>
        <ContentContainer>
          <AddressInput
            initialAddress={addressData}
            isEdit={isEdit}
            onChange={handleAddressData}
          />
        </ContentContainer>
        <OutlineButton
          label={isEdit ? "수정" : "등록"}
          onClick={handlePostAddress}
        />
      </Modal>
    )
  );
};

export default AddressAddModal;
