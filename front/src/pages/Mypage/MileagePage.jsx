import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HistoryItem from "../../components/MyPage/Mileage/HistoryItem";
import WithdrawConfirmationModal from "../../components/MyPage/Mileage/WithdrawConfirmationModal";
import axios from "axios";
import MoreButton from "../../components/common/MoreButton";
import Button from "../../components/common/Button";
import Swal from "sweetalert2"; 

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

const PageContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  color: var(--TEXT_PRIMARY);
  margin-bottom: 20px;
`;

const BalanceContainer = styled.div`
  width: 250px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--BACKGROUND_SECONDARY);
  border-radius: 10px;
  padding: 20px;
  padding-bottom: 30px;
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
  justify-content: space-between;
  height: 100%;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  width: 300px;

  &:focus {
    border-style: solid;
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-top: 10px;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: 20px 10px;
  margin-top: 50px;
`;

const WithdrawGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  height: 160px;
  margin: 20px 10px;
`;

const HistoryNull = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
  padding: 40px;
  text-align: center;
`;

const MileagePage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const userId = useSelector((state) => state.auth.userId);
  const nickname = useSelector((state) => state.auth.nickname);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: "",
    bank: "",
    receiver: "",
  });
  const [histories, setHistories] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showMoreButton, setShowMoreButton] = useState(false);

  useEffect(() => {
    const fetchMileage = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/mypage/${userId}/mileage`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const { mileage, accountNumber, bank, receiver } = response?.data?.data;
        setBalance(mileage);
        setAccountDetails({ accountNumber, bank, receiver });
      } catch (error) {
        console.error("Error fetching mileage:", error);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/mypage/${userId}/mileage/history`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setHistories(response?.data?.data);
        if (response?.data?.data.length == 10) {
          setShowMoreButton(true);
        }
      } catch (error) {
        console.error("Error fetching mileage history:", error);
      }
    };

    fetchMileage();
    fetchHistory();
  }, [userId]);

  const handleMore = async () => {
    const lastDate = histories[histories.length - 1]?.time;
    if (lastDate) {
      try {
        const response = await axios.get(
          `${baseURL}/mypage/${userId}/mileage/history-more?final-date=${lastDate}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setHistories([...histories, ...response?.data?.data]);
        if (response?.data?.data.length == 0) {
          Swal.fire({
            text: "더 이상 불러올 결제 내역이 없습니다.",
            icon: "warning",
            confirmButtonText: "확인",
            confirmButtonColor: "#FF7F50",
          })
          setShowMoreButton(false);
          return;
        }
        if (response?.data?.data.length < 10) {
          setShowMoreButton(false);
        } else if (response?.data?.data.length == 10) {
          setShowMoreButton(true);
        }
      } catch (error) {
        console.error("Error fetching more mileage history:", error);
      }
    }
  };

  const validateWithdrawAmount = (amount) => {
    if (amount <= 0) {
      setErrorMessage("출금 금액은 0원보다 커야 합니다.");
      return false;
    }
    if (amount > balance) {
      setErrorMessage("출금 금액은 현재 마일리지보다 작아야 합니다.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleWithdrawChange = (e) => {
    const amount = parseInt(e.target.value, 10);
    setWithdrawAmount(isNaN(amount) ? "" : amount);
    validateWithdrawAmount(amount);
  };

  const handleWithdraw = () => {
    if (validateWithdrawAmount(withdrawAmount)) {
      setIsConfirmationOpen(true);
    }
  };

  const handleConfirmWithdraw = async () => {
    try {
      await axios.post(
        `${baseURL}/mypage/${userId}/withdraw`,
        {
          requestMoney: withdrawAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      Swal.fire({
        text: "출금 신청이 완료되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      })
      setIsConfirmationOpen(false);
    } catch (error) {
      console.error("Error requesting withdrawal:", error);
      Swal.fire({
        text: "출금 신청에 실패했습니다.",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      })
    }
  };

  const handleAccountCheck = () => {
    navigate("/mypage/prouserinfo");
  };

  return (
    <PageContainer>
      <Title>마일리지 출금</Title>
      <WithdrawGroup>
        <Header>
          <Subtitle>{nickname} 님의 마일리지</Subtitle>
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
          <p style={{ color: "red" }}>{errorMessage && errorMessage}&nbsp;</p>
          <ButtonGroup>
            <Button
              color={"default"}
              label={"계좌확인"}
              onClick={handleAccountCheck}
            />
            <Button
              label={"출금신청"}
              onClick={handleWithdraw}
              disabled={!!errorMessage}
            />
          </ButtonGroup>
        </WithdrawSection>
      </WithdrawGroup>
      <HistoryList>
        <Subtitle style={{ alignSelf: "flex-start" }}>정산 내역</Subtitle>
        {histories.map((history) => (
          <HistoryItem key={history.historyId} history={history} />
        ))}
        {histories.length == 0 && (
          <HistoryNull>정산 내역이 없습니다.</HistoryNull>
        )}
        {showMoreButton && <MoreButton onClick={handleMore} />}
      </HistoryList>
      <WithdrawConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        amount={withdrawAmount}
        accountDetails={accountDetails}
        onConfirm={handleConfirmWithdraw}
      />
    </PageContainer>
  );
};

export default MileagePage;
