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
  margin-bottom: 20px;
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

const dummyPayments = [
  {
    paymentId: 1,
    payTime: '2024-07-18T12:34:56Z',
    userName: '이강사',
    classImage: '/path/to/image.jpg',
    className: '오늘부터 나도 갓생! 독서 클래스',
    classPrice: 41900,
    year: 2024,
    month: 8,
    day: 3,
    hour: 12,
    minute: 0,
    payCancelTime: null,
    classId: 101,
  },
  {
    paymentId: 2,
    payTime: '2024-07-11T12:34:56Z',
    userName: '이강사',
    classImage: '/path/to/image.jpg',
    className: '오늘부터 나도 갓생! 독서 클래스',
    classPrice: 41900,
    year: 2024,
    month: 7,
    day: 14,
    hour: 12,
    minute: 0,
    payCancelTime: '2024-07-15T12:34:56Z',
    classId: 102,
  },
  // 더미 데이터에 classId 추가
  {
    paymentId: 3,
    payTime: '2024-07-20T12:34:56Z',
    userName: '박강사',
    classImage: '/path/to/image2.jpg',
    className: '미래를 준비하는 독서 클래스',
    classPrice: 52900,
    year: 2024,
    month: 9,
    day: 1,
    hour: 14,
    minute: 30,
    payCancelTime: null,
    classId: 103,
  },
  {
    paymentId: 4,
    payTime: '2024-06-15T12:34:56Z',
    userName: '김강사',
    classImage: '/path/to/image3.jpg',
    className: '과거의 독서 클래스',
    classPrice: 35900,
    year: 2024,
    month: 6,
    day: 1,
    hour: 14,
    minute: 0,
    payCancelTime: null,
    classId: 104,
  },
];

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      // 서버와 통신하는 부분을 주석 처리하고 더미 데이터를 사용합니다.
      // const response = await axios.get(`/mypage/${userId}/payment`);
      // setPayments(response.data.payments);
      setPayments(dummyPayments); // 더미 데이터 설정
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
      // 서버와 통신하는 부분을 주석 처리하고 더미 데이터를 사용합니다.
      // const response = await axios.get(`/mypage/${userId}/payment-more?final-date=${finalDate}`);
      // setPayments((prevPayments) => [...prevPayments, ...response.data.payments]);
      setPayments((prevPayments) => [...prevPayments, ...dummyPayments]); // 더미 데이터 추가
    } catch (error) {
      console.error('Error loading more payments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>결제/수강 내역</Title>
      <PaymentDetail payments={payments} />
      <LoadMoreButton onClick={loadMorePayments} disabled={loading}>
        {loading ? '불러오는 중...' : '더보기'}
      </LoadMoreButton>
    </Container>
  );
};

export default PaymentPage;
