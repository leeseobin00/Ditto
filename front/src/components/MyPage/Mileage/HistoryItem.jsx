// src/components/MyPage/Mileage/HistoryItem.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--BORDER_COLOR);
  padding: 10px 0;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--WHITE);
  border: 2px solid ${({ $state }) => 
    $state === 0 ? 'var(--GREEN)' : $state === 1 ? 'var(--RED)' : 'var(--BLUE)'};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $state }) => 
    $state === 0 ? 'var(--GREEN)' : $state === 1 ? 'var(--RED)' : 'var(--BLUE)'};
  margin-right: 10px;
  padding: 3px;
  text-align: center; /* 텍스트를 중앙 정렬 */
  line-height: 1.2; /* 줄 간격 조정 */
  font-weight: bold;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;

const FinalAmount = styled.div`
  color: var(--TEXT_SECONDARY);
  margin-top: 10px;
`;

const AmountGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ClassName = styled.div`
  font-weight: bold;
  color: var(--TEXT_PRIMARY);
`;

const DateDiv = styled.div`
  font-size: 14px;
  color: var(--TEXT_SECONDARY);
`;

const Amount = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ $amount }) => ($amount > 0 ? 'var(--GREEN)' : 'var(--RED)')};
`;

const HistoryItem = ({ history }) => {
  const formattedDate = new Date(history.time).toLocaleDateString();

  return (
    <Container>
      <Detail>
        <Icon $state={history.state}>
          {history.state === 0 ? '입금' : history.state === 1 ? '출금대기중' : '출금완료'}
        </Icon>
        <Text>
          <ClassName>{history.className}</ClassName>
          <DateDiv>{formattedDate}</DateDiv>
        </Text>
      </Detail>
      <AmountGroup>
      <Amount $amount={history.mileageAmount}>
        {history.mileageAmount.toLocaleString()} 원
      </Amount>
      <FinalAmount>{history.finalAmount} 원</FinalAmount>
      </AmountGroup>
    </Container>
  );
};

export default HistoryItem;
