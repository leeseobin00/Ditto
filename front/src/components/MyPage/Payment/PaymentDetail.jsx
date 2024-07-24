import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryModal from './SummaryModal'; // SummaryModal 경로 수정

const ListContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const PaymentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 10px;
`;

const PaymentDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PaymentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 10px 0px 20px;
`;

const PaymentDate = styled.div`
  font-weight: bold;
  color: var(--TEXT_SECONDARY);
`;

const PaymentDetails = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CancleMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--TEXT_SECONDARY);
`;

const PaymentImage = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 100px;
  margin-left: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  cursor: pointer;
`;

const PaymentName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  max-width: 200px;
  color: var(--TEXT_PRIMARY);
`;

const ClassStartDateTime = styled.div`
  margin-bottom: 5px;
  color: var(--TEXT_SECONDARY);
`;

const PaymentPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 200px; /* 일정한 영역 확보를 위한 최소 너비 설정 */
`;

const PaymentPrice = styled.div`
  font-weight: bold;
  color: var(--PRIMARY);
  margin-bottom: 10px;
`;

const PaymentActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => (props.$cancel ? 'var(--LIGHT)' : 'var(--SECONDARY)')};
  color: ${(props) => (props.$cancel ? 'var(--RED)' : 'var(--LIGHT)')};
  border: 1px solid var(--TEXT_SECONDARY);
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const PaymentUserName = styled.div`
  color: var(--TEXT_SECONDARY);
`;

const PaymentDetail = ({ payments }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [summaries, setSummaries] = useState([]);

  const handleClassClick = (classId) => {
    navigate(`/class/${classId}`);
  };

  const handleCancelClick = async () => {
    try {
      const response = await axios.get('http://localhost:8080/mypage/payment/cancel', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (response.status === 200) {
        setModalMessage(response.data.refund);
      } else {
        setModalMessage('환불 규정 조회 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      setModalMessage('환불 규정 조회 실패. 다시 시도해주세요.');
      console.error('환불 규정 조회 에러:', error);
    } finally {
      setIsModalOpen(true);
    }
  };

  const handleSummaryClick = async (lectureId) => {
    try {
      const response = await axios.get(`http://localhost:8080/mypage/lecture/${lectureId}/summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (response.status === 200) {
        setSummaries(response.data.summaries);
        setIsModalOpen(true);
      } else {
        setModalMessage('요약 조회 실패. 다시 시도해주세요.');
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalMessage('요약 조회 실패. 다시 시도해주세요.');
      console.error('요약 조회 에러:', error);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
    setSummaries([]);
  };

  return (
    <ListContainer>
      {payments.map((payment) => {
        const classStartDateTime = new Date(
          payment.year,
          payment.month - 1,
          payment.day,
          payment.hour,
          payment.minute
        );
        const now = new Date();
        const payTime = new Date(payment.payTime);
        const payCancelTime = payment.payCancelTime ? new Date(payment.payCancelTime) : null;

        return (
          <PaymentItemContainer key={payment.paymentId}>
            <PaymentDateContainer>
              <PaymentDate>결제 {payTime.toLocaleDateString()}</PaymentDate>
            </PaymentDateContainer>
            <PaymentDetails>
              <PaymentImage src={payment.classImage} alt={payment.className} onClick={() => handleClassClick(payment.classId)} />
              <PaymentInfo onClick={() => handleClassClick(payment.classId)}>
                <PaymentName>{payment.className}</PaymentName>
                <ClassStartDateTime>
                  {`${payment.year}.${String(payment.month).padStart(2, '0')}.${String(payment.day).padStart(2, '0')} ${String(payment.hour).padStart(2, '0')}:${String(payment.minute).padStart(2, '0')}`}
                </ClassStartDateTime>
              </PaymentInfo>
              <PaymentInfoContainer>
                <PaymentUserName>{payment.userName}</PaymentUserName>
                <PaymentPrice>{payment.classPrice}원</PaymentPrice>
              </PaymentInfoContainer>
              <PaymentPriceContainer>
                <PaymentActions>
                  {!payCancelTime && classStartDateTime > now && (
                    <ActionButton $cancel onClick={handleCancelClick}>구매 취소</ActionButton>
                  )}
                  {payCancelTime && (
                    <CancleMessage>
                      <div>취소됨</div>
                      <div>{payCancelTime.toLocaleDateString()}</div>
                    </CancleMessage>
                  )}
                  {!payCancelTime && classStartDateTime <= now && (
                    <>
                      <ActionButton onClick={() => handleSummaryClick(payment.classId)}>요약 보기</ActionButton>
                      <ActionButton>리뷰 작성</ActionButton>
                    </>
                  )}
                </PaymentActions>
              </PaymentPriceContainer>
            </PaymentDetails>
          </PaymentItemContainer>
        );
      })}
      <SummaryModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        modalMessage={modalMessage}
        summaries={summaries}
      />
    </ListContainer>
  );
};

export default PaymentDetail;
