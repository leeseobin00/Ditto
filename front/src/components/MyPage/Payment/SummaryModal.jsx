import React from "react";
import { styled } from "styled-components";

import Modal from "../../common/Modal"; // Modal 컴포넌트 경로 수정

const Title = styled.div`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
`;

const ContentContainer = styled.div`
  margin-top: 25px;
  width: 100%;
  max-height: 350px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepTitle = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--SECONDARY);
  margin-bottom: 8px;
`;

const StepContent = styled.div`
  font-size: 14px;
`;

const SummaryNull = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
  padding: 40px;
  text-align: center;
`;

const SummaryModal = ({ show, onClose, summaries }) => {
  if (!show) return null;

  return (
    <Modal onClose={onClose}>
      <Title>강의 요약</Title>
      <ContentContainer>
        {summaries.length > 0 ? (
          summaries.map((summary, index) => (
            <StepContainer key={summary.summaryId}>
              <StepTitle>
                {index + 1}단계: {summary.stepName}
              </StepTitle>
              <StepContent>{summary.summaryContent}</StepContent>
            </StepContainer>
          ))
        ) : (
          <SummaryNull>강의 요약 내용이 존재하지 않습니다.</SummaryNull>
        )}
      </ContentContainer>
    </Modal>
  );
};

export default SummaryModal;
