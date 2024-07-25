// src/components/MyPage/ProQuestions/AnswerModal.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

const Modal = styled.div`
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

const ModalContent = styled.div`
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

const Title = styled.h3`
  text-align: center;
  color: var(--PRIMARY);
  font-size: 20px;
  margin-bottom: 20px;
`;

const Input = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 5px;
  font-size: 16px;
  resize: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--SECONDARY);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const AnswerModal = ({ isOpen, onClose, onSubmit, initialContent = '', mode = '답변' }) => {
  const [content, setContent] = useState(initialContent);

  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose} />
        <Title>{mode === '답변' ? '문의 답변' : '답변 수정'}</Title>
        <Input 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="답변을 입력하세요..."
        />
        <Button onClick={() => onSubmit(content)}>{mode}</Button>
      </ModalContent>
    </Modal>
  );
};

export default AnswerModal;
