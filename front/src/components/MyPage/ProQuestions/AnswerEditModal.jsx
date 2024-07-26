// src/components/MyPage/Answer/AnswerEditModal.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5'; // close 아이콘을 위해 react-icons 사용

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalContainer = styled.div`
  position: relative;
  background: var(--LIGHT);
  padding: 40px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  transition: all 0.3s ease-in-out;
  transform: translateY(0);
  opacity: 1;
`;

const CloseButton = styled(IoClose)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: var(--SECONDARY);
  font-size: 24px;
`;

const Title = styled.h2`
  text-align: center;
  color: var(--PRIMARY);
  font-size: 20px;
  margin: 20px 0;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 5px;
  resize: none;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => (props.$cancel ? 'var(--LIGHT)' : 'var(--SECONDARY)')};
  color: ${(props) => (props.$cancel ? 'var(--RED)' : 'var(--LIGHT)')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const AnswerEditModal = ({ isOpen, onClose, onSubmit, initialContent }) => {
  const [answer, setAnswer] = useState(initialContent);

  useEffect(() => {
    setAnswer(initialContent);
  }, [initialContent]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(answer);
  };

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose} />
        <Title>답변 수정</Title>
        <ModalBody>
          <TextArea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="답변을 수정하세요"
          />
        </ModalBody>
        <ModalFooter>
          <Button $cancel onClick={onClose}>취소</Button>
          <Button onClick={handleSubmit}>수정</Button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default AnswerEditModal;
