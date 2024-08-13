// src/components/Mileage/WithdrawConfirmationModal.js
import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import Modal from "../../common/Modal";
import OutlineButton from "../../common/OutlineButton";

const ModalContent = styled.div`
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

const Title = styled.h3`
  text-align: center;
  color: var(--PRIMARY);
  font-size: 20px;
  margin-bottom: 20px;
`;

const Details = styled.div`
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  color: var(--TEXT_PRIMARY);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) =>
    props.$cancel ? "var(--TEXT_SECONDARY)" : "var(--SECONDARY)"};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const WithdrawConfirmationModal = ({
  isOpen,
  onClose,
  amount,
  accountDetails,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <Title>{amount} 원을 출금하시겠습니까?</Title>
      <ModalContent>
        <CloseButton onClick={onClose} />
        <Details>
          <DetailItem>은행명: {accountDetails.bank}</DetailItem>
          <DetailItem>계좌번호: {accountDetails.accountNumber}</DetailItem>
          <DetailItem>예금주: {accountDetails.receiver}</DetailItem>
        </Details>
        <ButtonGroup>
          <OutlineButton onClick={onConfirm} label={"출금"} />
          <OutlineButton $cancel onClick={onClose} label={"취소"} />
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

export default WithdrawConfirmationModal;
