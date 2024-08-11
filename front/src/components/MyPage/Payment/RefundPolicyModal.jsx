import React from "react";
import styled from "styled-components";
import Modal from "../../common/Modal"; // Modal 컴포넌트 경로 수정
import OutlineButton from "../../common/OutlineButton";

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

const RefundPolicyModal = ({ onClose, onConfirm, refundPolicy }) => {
  return (
    <Modal onClose={onClose}>
      <RefundPolicyContainer>
        <RefundTitle>환불 규정</RefundTitle>
        <RefundContent>{refundPolicy}</RefundContent>
        <OutlineButton onClick={onConfirm}>구매 취소</OutlineButton>
      </RefundPolicyContainer>
    </Modal>
  );
};

export default RefundPolicyModal;
