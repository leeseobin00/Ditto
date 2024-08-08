import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

import axios from "axios";
import PaymentDetail from "../../components/MyPage/Payment/PaymentDetail";
import MoreButton from "../../components/common/MoreButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

const PaymentNull = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
  padding: 40px;
  text-align: center;
`;

const PaymentPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${baseURL}/mypage/${userId}/payment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response?.data);
      setPayments(response?.data);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePayments = async () => {
    if (payments.length === 0) return;

    const finalDate = payments[payments.length - 1].payTime;
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/mypage/${userId}/payment-more?final-date=${finalDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setPayments((prevPayments) => [...prevPayments, ...response?.data?.data]);
    } catch (error) {
      console.error("Error loading more payments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>결제/수강 내역</Title>
      {payments.length > 0 ? (
        <>
          <PaymentDetail payments={payments} setPayments={setPayments} />
          <MoreButton onClick={loadMorePayments} disabled={loading}>
            {loading ? "불러오는 중..." : "더보기"}
          </MoreButton>
        </>
      ) : (
        <PaymentNull>결제/수강한 클래스가 없습니다.</PaymentNull>
      )}
    </Container>
  );
};

export default PaymentPage;
