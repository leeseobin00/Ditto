import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HistoryItem from '../../../components/MyPage/Mileage/HistoryItem';
import WithdrawConfirmationModal from '../../../components/MyPage/Mileage/WithdrawConfirmationModal';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: var(--PRIMARY);
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  color: var(--TEXT_PRIMARY);
  margin-bottom: 20px;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--BACKGROUND_SECONDARY);
  border-radius: 10px;
  padding: 20px 100px 20px 20px;
`;

const BalanceLabel = styled.div`
  font-size: 16px;
  color: var(--TEXT_SECONDARY);
`;

const Balance = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: var(--PRIMARY);
  margin-top: 10px;
`;

const WithdrawSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-left: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  width: 300px;
`;

const Button = styled.button`
  padding: 5px 20px;
  background-color: var(--SECONDARY);
  color: white;
  border: none;
  border-radius: 13px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const CheckButton = styled.button`
  padding: 5px 20px;
  border: 1px solid var(--BORDER_COLOR);
  color: var(--TEXT_SECONDARY);
  background-color: var(--WHITE);
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-top: 10px;
`;

const HistoryList = styled.div`
  padding-left: 20px;
`;

const WithdrawGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const MoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const MoreButton = styled(Button)`
  padding: 10px 20px;
  background-color: var(--SECONDARY);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    filter: brightness(0.9);
  }
`;

const MileagePage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: '',
    bank: '',
    receiver: ''
  });
  const [histories, setHistories] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMileage = async () => {
      try {
        const response = await axios.get(`${baseURL}/mypage/${userId}/mileage`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const { mileage, accountNumber, bank, receiver } = response.data;
        setBalance(mileage);
        setAccountDetails({ accountNumber, bank, receiver });
      } catch (error) {
        console.error('Error fetching mileage:', error);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${baseURL}/mypage/${userId}/mileage/history`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setHistories(response.data.histories);
      } catch (error) {
        console.error('Error fetching mileage history:', error);
      }
    };

    fetchMileage();
    fetchHistory();
  }, [userId]);

  const handleMore = async () => {
    const lastDate = histories[histories.length - 1]?.time;
    if (lastDate) {
      try {
        const response = await axios.get(`${baseURL}/mypage/mileage/history-more?final-date=${lastDate}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setHistories([...histories, ...response.data.histories]);
      } catch (error) {
        console.error('Error fetching more mileage history:', error);
      }
    }
  };

  const validateWithdrawAmount = (amount) => {
    if (amount <= 0) {
      setErrorMessage('출금 금액은 0원보다 커야 합니다.');
      return false;
    }
    if (amount > balance) {
      setErrorMessage('출금 금액은 현재 마일리지보다 작아야 합니다.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleWithdrawChange = (e) => {
    const amount = parseInt(e.target.value, 10);
    setWithdrawAmount(isNaN(amount) ? '' : amount);
    validateWithdrawAmount(amount);
  };

  const handleWithdraw = () => {
    if (validateWithdrawAmount(withdrawAmount)) {
      setIsConfirmationOpen(true);
    }
  };

  const handleConfirmWithdraw = async () => {
    try {
      await axios.post(`${baseURL}/mypage/${userId}/withdraw`, {
        requestMoney: withdrawAmount,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      alert('출금 신청이 완료되었습니다.');
      setIsConfirmationOpen(false);
    } catch (error) {
      console.error('Error requesting withdrawal:', error);
      alert('출금 신청에 실패했습니다.');
    }
  };

  const handleAccountCheck = () => {
    navigate('/mypage/prouserinfo');
  };

  return (
    <Container>
      <WithdrawGroup>
        <Header>
          <Title>마일리지 출금</Title>
          <Subtitle>이강사 님의 마일리지</Subtitle>
          <BalanceContainer>
            <BalanceLabel>전체 마일리지</BalanceLabel>
            <Balance>{balance.toLocaleString()} 원</Balance>
          </BalanceContainer>
        </Header>
        <WithdrawSection>
          <Subtitle>출금 신청</Subtitle>
          <Input
            type="number"
            placeholder="신청 금액 입력"
            value={withdrawAmount}
            onChange={handleWithdrawChange}
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <ButtonGroup>
            <CheckButton onClick={handleAccountCheck}>계좌확인</CheckButton>
            <Button onClick={handleWithdraw} disabled={!!errorMessage}>
              출금하기
            </Button>
          </ButtonGroup>
        </WithdrawSection>
      </WithdrawGroup>
      <HistoryList>
        <h2>정산 내역</h2>
        {histories.map((history) => (
          <HistoryItem key={history.historyId} history={history} />
        ))}
        <MoreButtonContainer>
          <MoreButton onClick={handleMore}>더보기</MoreButton>
        </MoreButtonContainer>
      </HistoryList>
      <WithdrawConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        amount={withdrawAmount}
        accountDetails={accountDetails}
        onConfirm={handleConfirmWithdraw}
      />
    </Container>
  );
};

export default MileagePage;
