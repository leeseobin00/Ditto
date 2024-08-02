import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PaymentDetail from '../../../components/MyPage/Payment/PaymentDetail';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  align-self: flex-start;
  color: var(--PRIMARY);
  font-size: 20px;
  margin: 20px 13px;
`;

const LoadMoreButton = styled.button`
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

const PaymentPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/mypage/${userId}/payment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      
      setPayments(response?.data?.data);
    } catch (error) {
      console.error('Error fetching payment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePayments = async () => {
    if (payments.length === 0) return;

    const finalDate = payments[payments.length - 1].payTime;
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/mypage/${userId}/payment-more?final-date=${finalDate}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setPayments((prevPayments) => [...prevPayments, ...response?.data?.data]);
    } catch (error) {
      console.error('Error loading more payments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>결제/수강 내역</Title>
      <PaymentDetail payments={payments} setPayments={setPayments} />
      <LoadMoreButton onClick={loadMorePayments} disabled={loading}>
        {loading ? '불러오는 중...' : '더보기'}
      </LoadMoreButton>
    </Container>
  );
};

export default PaymentPage;
