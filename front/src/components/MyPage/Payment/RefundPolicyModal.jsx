// src/components/RefundPolicyModal.jsx
import React from 'react';
import styled from 'styled-components';
import Modal from '../../common/Modal'; // Modal 컴포넌트 경로 수정

const RefundPolicyContainer = styled.div`
  padding: 20px;
`;

const RefundTitle = styled.h2`
  text-align: center;
  color: var(--PRIMARY);
`;

const RefundContent = styled.div`
  margin: 20px 0;
  color: var(--TEXT_SECONDARY);
`;

const RefundButton = styled.button`
 padding: 10px 20px;
  background-color: var(--WHITE);
  color: var(--RED);
  font-weight: bold;
  border: 1px solid var(--BORDER_COLOR);
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  &:hover {
    filter: brightness(0.9);
  }
`;

const RefundPolicyModal = ({ onClose, onConfirm, refundPolicy }) => {
  return (
    <Modal onClose={onClose}>
      <RefundPolicyContainer>
        <RefundTitle>환불 규정</RefundTitle>
        <RefundContent>
          {refundPolicy}
        </RefundContent>
        <RefundButton onClick={onConfirm}>구매 취소</RefundButton>
      </RefundPolicyContainer>
    </Modal>
  );
};

export default RefundPolicyModal;
