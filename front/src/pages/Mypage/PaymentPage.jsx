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
  const { userId } = useSelector((state) => state.auth);

  const [payments, setPayments] = useState([]);
  const [showMoreButton, setShowMoreButton] = useState(true);

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
      setPayments(response?.data?.data);
      if (response?.data?.data.length < 5) {
        setShowMoreButton(false);
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const loadMorePayments = async () => {
    const finalDate = payments[payments.length - 1].payTime;
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
      if (response?.data?.data.length == 0) {
        Swal.fire({
          text: "더 이상 불러올 관심 유저가 없습니다.",
          icon: "info",
          confirmButtonText: "확인",
          confirmButtonColor: "#FF7F50",
        })
        setShowMoreButton(false);
        return;
      } else if (response?.data?.data.length < 5) {
        setShowMoreButton(false);
      }
    } catch (error) {
      console.error("Error loading more payments:", error);
    }
  };

  return (
    <Container>
      <Title>결제/수강 내역</Title>
      {payments.length > 0 ? (
        <>
          <PaymentDetail
            payments={payments}
            setPayments={setPayments}
            userId={userId}
            onUpdate={loadMorePayments}
            showMoreButton={showMoreButton}
          />
        </>
      ) : (
        <PaymentNull>결제/수강한 클래스가 없습니다.</PaymentNull>
      )}
    </Container>
  );
};

export default PaymentPage;
