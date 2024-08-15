import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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

const AccountNull = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
  padding: 40px;
  text-align: center;
`;

const WithdrawConfirmationModal = ({
  isOpen,
  onClose,
  amount,
  accountDetails,
  onConfirm,
}) => {
  const navigate = useNavigate();

  const handleAccountRegisterClick = () => {
    navigate("/mypage/prouserInfo");
  };
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <Title>{amount} 원을 출금하시겠습니까?</Title>
      <ModalContent>
        <Details>
          {accountDetails.accountNumber ? (
            <>
              <DetailItem>은행명: {accountDetails.bank}</DetailItem>
              <DetailItem>계좌번호: {accountDetails.accountNumber}</DetailItem>
              <DetailItem>예금주: {accountDetails.receiver}</DetailItem>
            </>
          ) : (
            <AccountNull>
              등록된 계좌가 없습니다.
              <br />
              계좌를 등록해주세요.
            </AccountNull>
          )}
        </Details>
        {accountDetails.accountNumber ? (
          <ButtonGroup>
            <OutlineButton onClick={onConfirm} label={"출금"} />
            <OutlineButton
              $cancel
              onClick={onClose}
              label={"취소"}
              color={"ACCENT1"}
            />
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <OutlineButton
              label={"계좌 등록"}
              onClick={handleAccountRegisterClick}
            />
          </ButtonGroup>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WithdrawConfirmationModal;
