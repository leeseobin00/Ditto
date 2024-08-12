// src/components/Mileage/WithdrawConfirmationModal.js
import React from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

const Modal = styled.div`
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

const CloseButton = styled(IoClose)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: var(--SECONDARY);
  font-size: 24px;
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
  background-color: ${(props) => (props.$cancel ? 'var(--TEXT_SECONDARY)' : 'var(--SECONDARY)')};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const WithdrawConfirmationModal = ({ isOpen, onClose, amount, accountDetails, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose} />
        <Title>{amount} 원을 출금하시겠습니까?</Title>
        <Details>
          <DetailItem>은행명: {accountDetails.bank}</DetailItem>
          <DetailItem>계좌번호: {accountDetails.accountNumber}</DetailItem>
          <DetailItem>예금주: {accountDetails.receiver}</DetailItem>
        </Details>
        <ButtonGroup>
          <Button onClick={onConfirm}>출금</Button>
          <Button $cancel onClick={onClose}>취소</Button>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

export default WithdrawConfirmationModal;
