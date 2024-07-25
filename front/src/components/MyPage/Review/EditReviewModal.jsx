import React from 'react';
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
  color: var(--TEXT_PRIMARY);
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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 5px;
  resize: none;
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

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Star = styled.span`
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.$active ? 'var(--YELLOW)' : 'var(--BORDER_COLOR)'};
`;

const EditReviewModal = ({ isOpen, onClose, onSave, title, content, setTitle, setContent, rating, setRating }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose} />
        <Title>리뷰 수정</Title>
        <ModalBody>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                $active={star <= rating}
                onClick={() => setRating(star)}
              >
                ★
              </Star>
            ))}
          </RatingContainer>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onSave}>수정</Button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default EditReviewModal;
