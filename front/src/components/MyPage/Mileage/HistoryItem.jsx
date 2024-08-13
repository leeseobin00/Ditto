// src/components/MyPage/Mileage/HistoryItem.js
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--BORDER_COLOR);
  padding: 10px 0;
  width: 100%;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--WHITE);
  border: 2px solid
    ${({ $state }) =>
      $state === 0
        ? "var(--BLUE)"
        : $state === 2
          ? "var(--RED)"
          : "var(--GREEN)"};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $state }) =>
    $state === 0
      ? "var(--BLUE)"
      : $state === 2
        ? "var(--RED)"
        : "var(--GREEN)"};
  margin-right: 10px;
  padding: 3px;
  text-align: center; /* 텍스트를 중앙 정렬 */
  line-height: 1.2; /* 줄 간격 조정 */
  font-weight: 600;
  font-size: 12px;
  white-space: pre-line;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  justify-content: space-between;
  height: 50px;
  padding: 5px 0;
`;

const FinalAmount = styled.div`
  color: var(--TEXT_SECONDARY);
  margin-top: 10px;
  font-size: 12px;
`;

const AmountGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ClassName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: var(--TEXT_PRIMARY);
`;

const DateDiv = styled.div`
  font-size: 14px;
  color: var(--TEXT_SECONDARY);
`;

const Amount = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ $state }) => ($state == 0 ? "var(--BLUE)" : "var(--RED)")};
`;

const HistoryItem = ({ history }) => {
  const formattedDate = new Date(history.time).toLocaleDateString();

  return (
    <Container>
      <Detail>
        <Icon $state={history.state}>
          {history.state === 0
            ? "입금"
            : history.state === 1
              ? "출금 \n 대기중"
              : "출금\n완료"}
        </Icon>
        <Text>
          <ClassName>
            {history.className ? history.className : "본인 출금"}
          </ClassName>
          <DateDiv>{formattedDate}</DateDiv>
        </Text>
      </Detail>
      <AmountGroup>
        <Amount $state={history.state}>
          {history.mileageAmount.toLocaleString()} 원
        </Amount>
        <FinalAmount>
          잔액&nbsp;&nbsp;&nbsp;{history.finalAmount} 원
        </FinalAmount>
      </AmountGroup>
    </Container>
  );
};

export default HistoryItem;
