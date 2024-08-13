import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";

import useAxios from "../../hooks/useAxios";
import RoundButton from "../../components/common/RoundButton";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoMessage = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: var(--PRIMARY);
  margin: auto;
  text-align: center;
  margin: 20px;
`;

const ButtonContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  margin: 60px;
`;

function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const { sendRequest } = useAxios();

  useEffect(() => {
    const requestData = {
      paymentKey: searchParams.get("paymentKey"),
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      userId: searchParams.get("userId"),
      lectureId: searchParams.get("lectureId"),
    };

    async function confirm() {
      try {
        await sendRequest("/payments/approve", requestData, "post");
      } catch {
        console.error(error);
      }
    }
    confirm();
  }, [searchParams]);

  const navigate = useNavigate();

  useEffect(() => {
    window.history.replaceState(null, "", "/");

    // popstate 이벤트를 통해 뒤로가기를 감지하고 특정 페이지로 이동
    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    // popstate 이벤트 리스너 추가
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const navigateTo = () => {
    navigate("/mypage/payment");
  };

  return (
    <PageContainer>
      <InfoMessage>결제가 완료되었습니다.</InfoMessage>
      <ButtonContainer>
        <RoundButton
          label={"결제 내역 바로가기"}
          onClick={navigateTo}
          size={"lg"}
        />
      </ButtonContainer>
    </PageContainer>
  );
}

export default OrderSuccessPage;
