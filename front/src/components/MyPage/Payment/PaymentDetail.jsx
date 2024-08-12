import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import axios from "axios";
import SummaryModal from "./SummaryModal";
import RefundPolicyModal from "./RefundPolicyModal";
import RoundButton from "../../common/RoundButton";
import OutlineButton from "../../common/OutlineButton";
import Swal from "sweetalert2";
import ReviewPostModal from "../../Review/ReviewPostModal";
import MoreButton from "../../common/MoreButton";

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
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const PaymentName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  width: 100%;
  color: var(--TEXT_PRIMARY);
`;

const ClassStartDateTime = styled.div`
  color: var(--TEXT_SECONDARY);
  font-size: 14px;
`;

const PaymentPrice = styled.div`
  font-weight: bold;
  color: var(--PRIMARY);
`;

const PaymentActions = styled.div`
  display: flex;
  flex-direction: column;
  height: 70px;
  padding: 5px 0;
  justify-content: center;
`;

const PaymentUserName = styled.div`
  color: var(--TEXT_SECONDARY);
`;

const ReviewFinished = styled.div`
  font-size: 14px;
  color: var(--SECONDARY);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
`;

const PaymentDetail = ({
  payments = [],
  setPayments,
  userId,
  onUpdate,
  showMoreButton,
}) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false); // 환불 정책 모달 구분 상태
  const [summaries, setSummaries] = useState([]);
  const [currentLectureId, setCurrentLectureId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [canReviewMap, setCanReviewMap] = useState({});

  const handleClassClick = (classId) => {
    navigate(`/classes/detail/${classId}`);
  };

  const handleCancelClick = async (lectureId) => {
    setCurrentLectureId(lectureId);
    setShowRefundModal(true);
  };

  const handleSummaryClick = async (lectureId) => {
    try {
      const response = await axios.get(`${baseURL}/summary/${lectureId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response?.status === 200) {
        setSummaries(response?.data?.data);
        setShowSummaryModal(true);
      } else {
      }
    } catch (error) {
      Swal.fire({
        title: "요약 조회 실패",
        text: "다시 시도해주세요.",
        icon: "error",
        confirmButtonColor: "#FF7F50",
        confirmButtonText: "확인",
      });
      console.error(error);
    }
  };

  // 리뷰 작성 가능 여부 조작
  useEffect(() => {
    // 각 payment에 대해 handleGetCanReview 실행
    payments.forEach((payment) => {
      handleGetCanReview(payment.classId, payment.lectureId);
    });
  }, [payments]);

  const handleGetCanReview = async (classId, lectureId) => {
    try {
      const response = await axios.get(
        `${baseURL}/classes/${classId}/lectures/${lectureId}/review/completed?userId=${userId}`
      );
      setCanReviewMap((prev) => ({
        ...prev,
        [lectureId]: !response?.data?.data,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  // 리뷰 작성 조작
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleReviewClick = (payment) => {
    setSelectedPayment(payment);
    setShowReviewModal(true);
  };

  const closeModal = () => {
    setShowRefundModal(false);
    setShowSummaryModal(false);
    setShowReviewModal(false);
    setSummaries([]);
  };

  // 결제 취소 조작
  const handleConfirmCancel = async () => {
    try {
      await axios.put(
        `${baseURL}/payments/cancel/${userId}/${currentLectureId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setPayments(
        payments.map((payment) =>
          payment.lectureId == currentLectureId
            ? { ...payment, payCancelTime: new Date() }
            : payment
        )
      );

      Swal.fire({
        title: "취소 완료",
        text: "결제가 성공적으로 취소되었습니다.",
        icon: "success",
        confirmButtonColor: "#FF7F50",
        confirmButtonText: "확인",
      });
      closeModal();
    } catch (error) {
      Swal.fire({
        title: "취소 실패",
        text: "다시 시도해주세요.",
        icon: "error",
        confirmButtonColor: "#FF7F50",
        confirmButtonText: "확인",
      });
      console.error(error);
    }
  };

  return (
    <ListContainer>
      {payments.map((payment) => {
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
                  {`${payment.year}-${String(payment.month).padStart(2, "0")}-${String(payment.day).padStart(2, "0")} ${String(payment.hour).padStart(2, "0")}:${String(payment.minute).padStart(2, "0")}`}
                </ClassStartDateTime>
              </PaymentInfo>
              <PaymentInfoContainer>
                <PaymentUserName>{payment.userName}</PaymentUserName>
                <PaymentPrice>{payment.classPrice}&nbsp;원</PaymentPrice>
              </PaymentInfoContainer>
              <PaymentActions>
                {!payCancelTime && !payment.isFinished && (
                  <OutlineButton
                    color={"ACCENT1"}
                    label={"구매 취소"}
                    size={"sm"}
                    $cancel
                    onClick={() => handleCancelClick(payment.lectureId)}
                    style={{ margin: "auto 0" }}
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
                {payment.isFinished && !payCancelTime && (
                  <ButtonContainer>
                    <RoundButton
                      label={"요약 보기"}
                      size={"sm"}
                      onClick={() => handleSummaryClick(payment?.lectureId)}
                    />
                    {canReviewMap[payment?.lectureId] ? (
                      <RoundButton
                        label={"리뷰 작성"}
                        size={"sm"}
                        onClick={() => handleReviewClick(payment)}
                      />
                    ) : (
                      <ReviewFinished>리뷰 작성 완료</ReviewFinished>
                    )}
                  </ButtonContainer>
                )}
              </PaymentActions>
            </PaymentDetails>
          </PaymentItemContainer>
        );
      })}
      {showMoreButton && <MoreButton onClick={onUpdate} />}
      <ReviewPostModal
        show={showReviewModal}
        onClose={closeModal}
        userId={userId}
        classId={selectedPayment?.classId}
        isClass={false}
        payment={selectedPayment}
        onUpdate={() =>
          handleGetCanReview(selectedPayment.classId, selectedPayment.lectureId)
        } // 리뷰 제출 후 리뷰 가능 여부 다시 확인
      />

      <RefundPolicyModal
        show={showRefundModal}
        onClose={closeModal}
        onConfirm={handleConfirmCancel}
      />
      <SummaryModal
        show={showSummaryModal}
        onClose={closeModal}
        summaries={summaries}
      />
    </ListContainer>
  );
};

export default PaymentDetail;
