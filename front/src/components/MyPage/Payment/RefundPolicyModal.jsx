import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Modal from "../../common/Modal"; // Modal 컴포넌트 경로 수정
import OutlineButton from "../../common/OutlineButton";

const Title = styled.div`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
`;

const RefundPolicyContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  width: 100%;
  max-height: 330px;
  overflow: auto;
`;

const RefundContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 100%;
`;

const ContentLine = styled.div`
  font-size: 12px;
`;

const ContentStrong = styled(ContentLine)`
  font-weight: 600;
`;

const CheckBoxLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CheckBox = styled.input`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

const RefundPolicyModal = ({ show, onClose, onConfirm }) => {
  const [isChecked, setIsChecked] = useState(false);

  if (!show) return null;

  const handleCheckBoxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleConfirmClick = () => {
    if (!isChecked) {
      Swal.fire({
        text: "환불 규정에 동의해야 구매 취소가 가능합니다.",
        icon: "info",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      })
    } else {
      onConfirm();
    }
  };

  return (
    <Modal onClose={onClose}>
      <Title>환불 규정</Title>
      <RefundPolicyContainer>
        <RefundContent>
          <ContentLine>
            저희 Ditto는 고객님께 최상의 학습 경험을 제공하기 위해 최선을 다하고
            있습니다. 강의 환불 규정은 다음과 같습니다.
          </ContentLine>
        </RefundContent>
        <RefundContent>
          <ContentStrong>1. 환불 요청 기간</ContentStrong>
          <ContentLine>강의 시작 7일 이전: 전액 환불</ContentLine>
          <ContentLine>강의 시작 7일 이내: 환불 불가</ContentLine>
        </RefundContent>
        <RefundContent>
          <ContentStrong>2. 환불 절차</ContentStrong>
          <ContentLine>
            구매 취소 후 환불이 승인되면, 승인일로부터 7영업일 이내에
            결제수단으로 환불 처리됩니다.
          </ContentLine>
        </RefundContent>
        <RefundContent>
          <ContentStrong>3. 예외 사항</ContentStrong>
          <ContentLine>
            강의가 취소되거나 일정이 변경된 경우, 전액 환불해 드립니다.
          </ContentLine>
          <ContentLine>
            특별한 사정으로 환불이 필요할 경우, 개별적으로 검토하여 처리할 수
            있습니다.
          </ContentLine>
          <ContentLine>
            환불 시 발생하는 은행 수수료 등 부대 비용은 고객 부담입니다.
          </ContentLine>
        </RefundContent>
        <RefundContent>
          <ContentLine>
            저희 환불 규정을 이해해 주셔서 감사합니다. 추가 문의사항이 있으시면
            support@Ditto.com 으로 연락해 주세요.
          </ContentLine>
        </RefundContent>
        <CheckBoxLine>
          <CheckBox
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckBoxChange}
          />
          <ContentLine>
            회원은 본 환불 규정에 동의하며, 구매를 취소합니다.
          </ContentLine>
        </CheckBoxLine>
      </RefundPolicyContainer>
      <OutlineButton
        onClick={handleConfirmClick}
        label={"구매 취소"}
        color={"ACCENT1"}
      />
    </Modal>
  );
};

export default RefundPolicyModal;
