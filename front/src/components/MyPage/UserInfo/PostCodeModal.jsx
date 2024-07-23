import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import DaumPostcode from 'react-daum-postcode';

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
  z-index: 3;
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

const CustomCloseIcon = styled(MdClose)`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  font-size: 32px;
  color: var(--SECONDARY);
  &:hover {
    color: var(--SECONDARY_DARK);
  }
`;

const PostcodeModal = ({ onComplete, onClose }) => (
  <Overlay onClick={onClose}>
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <CustomCloseIcon onClick={onClose} />
      <DaumPostcode onComplete={onComplete} autoClose />
    </ModalContainer>
  </Overlay>
);

export default PostcodeModal;
