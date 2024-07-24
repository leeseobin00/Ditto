// src/components/SummaryModal.jsx
import React from 'react';
import Modal from '../../common/Modal'; // Modal 컴포넌트 경로 수정

const SummaryModal = ({ isOpen, onClose, modalMessage, summaries }) => {
  return (
    isOpen && (
      <Modal onClose={onClose}>
        <h2>강의 요약</h2>
        {summaries.length > 0 ? (
          <ul>
            {summaries.map((summary) => (
              <li key={summary.summaryId}>
                <p><strong>단계 {summary.stepId}:</strong> {summary.summaryContent}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>{modalMessage}</p>
        )}
      </Modal>
    )
  );
};

export default SummaryModal;
