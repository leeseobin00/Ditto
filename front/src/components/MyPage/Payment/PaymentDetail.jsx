import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import axios from "axios";
import SummaryModal from "./SummaryModal"; // SummaryModal 컴포넌트 경로 수정
import RefundPolicyModal from "./RefundPolicyModal"; // RefundPolicyModal 컴포넌트 경로 수정
import RoundButton from "../../common/RoundButton";
import OutlineButton from "../../common/OutlineButton";

const ListContainer = styled.div`
  margin: 10px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaymentItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
`;

const PaymentDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PaymentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 10px 0px 20px;
`;

const PaymentDate = styled.div`
  font-size: 14px;
  margin-left: 10px;
  color: var(--TEXT_SECONDARY);
`;

const PaymentDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const CancleMessage = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  color: var(--TEXT_SECONDARY);
`;

const PaymentImage = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 50px;
  margin-left: 10px;
  border-radius: 50px;
  cursor: pointer;
`;

const PaymentInfo = styled.div`
  height: 100%;
  min-height: 70px;
  padding: 10px 0;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const PaymentName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  max-width: 200px;
  color: var(--TEXT_PRIMARY);
`;

const ClassStartDateTime = styled.div`
  color: var(--TEXT_SECONDARY);
  font-size: 14px;
`;

const PaymentPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 150px;
`;

const PaymentPrice = styled.div`
  font-weight: bold;
  color: var(--PRIMARY);
`;

const PaymentActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: ${(props) =>
    props.$cancel ? "var(--LIGHT)" : "var(--SECONDARY)"};
  color: ${(props) => (props.$cancel ? "var(--RED)" : "var(--LIGHT)")};
  border: 1px solid var(--TEXT_SECONDARY);
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const PaymentUserName = styled.div`
  color: var(--TEXT_SECONDARY);
`;

const PaymentDetail = ({ payments = [], setPayments, userId }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefundPolicy, setIsRefundPolicy] = useState(false); // 환불 정책 모달 구분 상태
  const [modalMessage, setModalMessage] = useState("");
  const [summaries, setSummaries] = useState([]);
  const [refundPolicy, setRefundPolicy] = useState("");
  const [currentLectureId, setCurrentLectureId] = useState(null);

  const handleClassClick = (classId) => {
    navigate(`/classes/detail/${classId}`);
  };

  const handleCancelClick = async (lectureId) => {
    setCurrentLectureId(lectureId);
    try {
      const response = await axios.put(
        `${baseURL}/payments/cancel/${userId}/${lectureId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setRefundPolicy(response.data.data.refund);
        setIsRefundPolicy(true);
        setIsModalOpen(true);
      } else {
        alert("환불 규정 조회 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("환불 규정 조회 실패. 다시 시도해주세요.");
      console.error(error);
    }
  };

  const handleSummaryClick = async (lectureId) => {
    try {
      const response = await axios.get(
        `${baseURL}/mypage/lecture/${lectureId}/summary`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setSummaries(response.data.data.summaries);
        setIsRefundPolicy(false);
        setIsModalOpen(true);
      } else {
        alert("요약 조회 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("요약 조회 실패. 다시 시도해주세요.");
      console.error("요약 조회 에러:", error);
    }
  };

  const handleReviewClick = (classId) => {
    navigate(`/class/${classId}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsRefundPolicy(false);
    setModalMessage("");
    setSummaries([]);
    setRefundPolicy("");
  };

  const handleConfirmCancel = async () => {
    try {
      const response = await axios.patch(
        `${baseURL}/mypage/${userId}/payment/cancel`,
        { lectureId: currentLectureId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setPayments(
          payments.map((payment) =>
            payment.lectureId === currentLectureId
              ? { ...payment, payCancelTime: new Date() }
              : payment
          )
        );
      } else {
        alert("취소 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("취소 실패. 다시 시도해주세요.");
      console.error(error);
    } finally {
      setIsRefundPolicy(false);
      setIsModalOpen(true);
    }
  };

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
        const payCancelTime = payment.payCancelTime
          ? new Date(payment.payCancelTime)
          : null;

        return (
          <PaymentItemContainer key={payment.paymentId}>
            <PaymentDateContainer>
              <PaymentDate>
                {payTime.toISOString().split("T")[0]}&nbsp;&nbsp;결제
              </PaymentDate>
            </PaymentDateContainer>
            <PaymentDetails>
              <PaymentImage
                src={`http://i11a106.p.ssafy.io:8080/files/download/${payment.fileId}`}
                alt={payment.className}
                onClick={() => handleClassClick(payment.classId)}
              />
              <PaymentInfo onClick={() => handleClassClick(payment.classId)}>
                <PaymentName>{payment.className}</PaymentName>
                <ClassStartDateTime>
                  {`${payment.year}.${String(payment.month).padStart(2, "0")}.${String(payment.day).padStart(2, "0")} ${String(payment.hour).padStart(2, "0")}:${String(payment.minute).padStart(2, "0")}`}
                </ClassStartDateTime>
              </PaymentInfo>
              <PaymentInfoContainer>
                <PaymentUserName>{payment.userName}</PaymentUserName>
                <PaymentPrice>{payment.classPrice}&nbsp;원</PaymentPrice>
              </PaymentInfoContainer>
              <PaymentPriceContainer>
                <PaymentActions>
                  {!payCancelTime && classStartDateTime > now && (
                    <OutlineButton
                      color={"ACCENT1"}
                      label={"구매 취소"}
                      size={"sm"}
                      $cancel
                      onClick={() => handleCancelClick(payment.lectureId)}
                    />
                  )}
                  {payCancelTime && (
                    <CancleMessage>
                      <div style={{ fontSize: "14px", color: "var(--RED)" }}>
                        취소됨
                      </div>
                      <div style={{ fontSize: "14px" }}>
                        {payCancelTime.toISOString().split("T")[0]}
                      </div>
                    </CancleMessage>
                  )}
                  {!payCancelTime && classStartDateTime <= now && (
                    <>
                      <RoundButton
                        label={"요약 보기"}
                        size={"sm"}
                        onClick={() => handleSummaryClick(payment.lectureId)}
                      />
                      <RoundButton
                        label={"리뷰 작성"}
                        size={"sm"}
                        onClick={() => handleReviewClick(payment.classId)}
                      />
                    </>
                  )}
                </PaymentActions>
              </PaymentPriceContainer>
            </PaymentDetails>
          </PaymentItemContainer>
        );
      })}
      {isModalOpen &&
        (isRefundPolicy ? (
          <RefundPolicyModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleConfirmCancel}
            refundPolicy={refundPolicy}
          />
        ) : (
          <SummaryModal
            isOpen={isModalOpen}
            onClose={closeModal}
            modalMessage={modalMessage}
            summaries={summaries}
          />
        ))}
    </ListContainer>
  );
};

export default PaymentDetail;
