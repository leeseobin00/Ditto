import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  margin-top: 20px;
`;

const PaymentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  padding: 20px;
  margin: 20px;
`;

const PaymentDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PaymentDate = styled.div`
  font-weight: bold;
`;

const PaymentDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaymentImage = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 20px;
  border-radius: 10px;
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaymentName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ClassStartDateTime = styled.div`
  margin-bottom: 5px;
`;

const PaymentPrice = styled.div`
  font-weight: bold;
  color: var(--PRIMARY);
  margin-right: 20px;
`;

const PaymentActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  margin: 5px;
  background-color: ${(props) => (props.$cancel ? 'var(--RED)' : 'var(--SECONDARY)')};
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const PaymentUserName = styled.div`
  margin-right: 20px;
`;

const PaymentDetail = ({ payments }) => {
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
              <PaymentImage src={payment.classImage} alt={payment.className} />
              <PaymentInfo>
                <PaymentName>{payment.className}</PaymentName>
                <ClassStartDateTime>
                  {`${payment.year}.${String(payment.month).padStart(2, '0')}.${String(payment.day).padStart(2, '0')} ${String(payment.hour).padStart(2, '0')}:${String(payment.minute).padStart(2, '0')}`}
                </ClassStartDateTime>
              </PaymentInfo>
              <div>
                <PaymentUserName>{payment.userName}</PaymentUserName>
                <PaymentPrice>{payment.classPrice}원</PaymentPrice>
              </div>
              <PaymentActions>
                {!payCancelTime && classStartDateTime > now && (
                  <ActionButton $cancel>구매 취소</ActionButton>
                )}
                {payCancelTime && (
                  <div>취소됨 {payCancelTime.toLocaleDateString()}</div>
                )}
                {!payCancelTime && classStartDateTime <= now && (
                  <>
                    <ActionButton>요약 보기</ActionButton>
                    <ActionButton>리뷰 작성</ActionButton>
                  </>
                )}
              </PaymentActions>
            </PaymentDetails>
          </PaymentItemContainer>
        );
      })}
    </ListContainer>
  );
};

export default PaymentDetail;
