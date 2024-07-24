// src/pages/Mypage/PaymentDetail.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SummaryModal from './SummaryModal'; // SummaryModal 컴포넌트 경로 수정
import RefundPolicyModal from './RefundPolicyModal'; // RefundPolicyModal 컴포넌트 경로 수정

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
  const [isRefundPolicy, setIsRefundPolicy] = useState(false); // 환불 정책 모달 구분 상태
  const [modalMessage, setModalMessage] = useState('');
  const [summaries, setSummaries] = useState([]);
  const [refundPolicy, setRefundPolicy] = useState('');

  const handleClassClick = (classId) => {
    navigate(`/class/${classId}`);
  };

  const handleCancelClick = async () => {
    // 서버와 통신하는 부분 주석 처리
    // try {
    //   const response = await axios.get('http://localhost:8080/mypage/payment/cancel', {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //     }
    //   });

    //   if (response.status === 200) {
    //     setRefundPolicy(response.data.refund);
    //     setIsRefundPolicy(true);
    //     setIsModalOpen(true);
    //   } else {
    //     alert('환불 규정 조회 실패. 다시 시도해주세요.');
    //   }
    // } catch (error) {
    //   alert('환불 규정 조회 실패. 다시 시도해주세요.');
    //   console.error('환불 규정 조회 에러:', error);
    // }

    // 테스트를 위한 더미 데이터
    const dummyRefundPolicy = `
      환불 규정:
      1. 환불 요청 기간: 강의 시작 7일 이전: 전액 환불, 강의 시작 7일 이내: 환불 불가.
      2. 환불 절차: 구매 취소 후 환불이 승인되면, 승인일로부터 7영업일 이내에 결제수단으로 환불 처리됩니다.
      3. 예외 사항: 강의가 취소되거나 일정이 변경된 경우, 전액 환불해 드립니다.
    `;
    setRefundPolicy(dummyRefundPolicy);
    setIsRefundPolicy(true);
    setIsModalOpen(true);
  };

  const handleSummaryClick = async (lectureId) => {
    // 서버와 통신하는 부분 주석 처리
    // try {
    //   const response = await axios.get(`http://localhost:8080/mypage/lecture/${lectureId}/summary`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //     }
    //   });

    //   if (response.status === 200) {
    //     setSummaries(response.data.summaries);
    //     setIsRefundPolicy(false);
    //     setIsModalOpen(true);
    //   } else {
    //     alert('요약 조회 실패. 다시 시도해주세요.');
    //   }
    // } catch (error) {
    //   alert('요약 조회 실패. 다시 시도해주세요.');
    //   console.error('요약 조회 에러:', error);
    // }

    // 테스트를 위한 더미 데이터
    const dummySummaries = [
      { summaryId: 1, stepId: 1, summaryContent: '첫 번째 단계 요약 내용입니다.' },
      { summaryId: 2, stepId: 2, summaryContent: '두 번째 단계 요약 내용입니다.' },
    ];
    setSummaries(dummySummaries);
    setIsRefundPolicy(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsRefundPolicy(false);
    setModalMessage('');
    setSummaries([]);
    setRefundPolicy('');
  };

  const handleConfirmCancel = async () => {
    // 서버와 통신하는 부분 주석 처리
    // try {
    //   const response = await axios.patch(`http://localhost:8080/mypage/${userId}/payment/cancel`, {
    //     userId
    //   }, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //     }
    //   });

    //   if (response.status === 200) {
    //     setModalMessage('결제/수강 취소 성공');
    //   } else {
    //     alert('취소 실패. 다시 시도해주세요.');
    //   }
    // } catch (error) {
    //   alert('취소 실패. 다시 시도해주세요.');
    //   console.error('취소 에러:', error);
    // }

    // 테스트를 위한 더미 데이터
    setModalMessage('결제/수강 취소 성공');
    setIsRefundPolicy(false);
    setIsModalOpen(true);
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
              <PaymentImage src={payment.fileUrl} alt={payment.className} onClick={() => handleClassClick(payment.classId)} />
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
      {isModalOpen && (
        isRefundPolicy ? (
          <RefundPolicyModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleConfirmCancel}
            refundPolicy={refundPolicy}
          />
        ) : (
          <SummaryModal
            isOpen={isModalOpen}
            onClose={closeModal}
            modalMessage={modalMessage}
            summaries={summaries}
          />
        )
      )}
    </ListContainer>
  );
};

export default PaymentDetail;
