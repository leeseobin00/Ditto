import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axiosIntercepter from "../../features/axiosIntercepter";
import Modal from "../common/Modal";
import AddressInput from "./AddressInput";
import OutlineButton from "../common/OutlineButton";
import Swal from "sweetalert2";

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

const AddressPostModal = ({
  show,
  initialAddress,
  onClose,
  onUpdate,
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
      Swal.fire({
        title: "입력 오류",
        text: "모든 값을 정확히 입력해주세요.",
        icon: "error",
        confirmButtonColor: "#FF7F50",
        confirmButtonText: "확인",
      });
      return false;
    }
    return true;
  };

  const handlePostAddress = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (isEdit) {
        await axiosIntercepter.patch(
          `/mypage/${userId}/address/${initialAddress.addressId}`,
          addressData
        );
        Swal.fire({
          title: "수정 완료",
          text: "배송지 정보가 수정되었습니다.",
          icon: "success",
          confirmButtonColor: "var(--GREEN)",
          confirmButtonText: "확인",
        });
      } else {
        // 주소 추가 (POST 요청)
        await axiosIntercepter.post(`/mypage/${userId}/address`, addressData);
        Swal.fire({
          title: "등록 완료",
          text: "배송지 정보가 등록되었습니다.",
          icon: "success",
          confirmButtonColor: "var(--GREEN)",
          confirmButtonText: "확인",
        });
      }
      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "오류",
        text: "주소 등록 또는 수정에 실패했습니다. 다시 시도해주세요.",
        icon: "error",
        confirmButtonColor: "#FF7F50",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    show && (
      <Modal onClose={onClose}>
        <Title>{isEdit ? "배송지 수정" : "배송지 입력"}</Title>
        <ContentContainer>
          <AddressInput
            initialAddress={initialAddress}
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

export default AddressPostModal;
