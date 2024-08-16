import { styled } from "styled-components";
import { MdClose } from "react-icons/md";

// 오버레이 스타일 정의
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
  z-index: 100;
`;

// 모달 컨테이너 스타일 정의
const ModalContainer = styled.div`
  position: relative;
  background: VAR(--LIGHT);
  padding: 20px;
  border-radius: 8px;
  max-width: 550px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;

  // 모달 애니메이션 (옵션)
  transition: all 0.3s ease-in-out;
  transform: translateY(0);
  opacity: 1;
`;

// 커스텀 아이콘 스타일 정의
const CustomCloseIcon = styled(MdClose)`
  position: absolute; // 절대 위치 설정
  top: 16px; // 상단에서 16px 떨어진 위치
  right: 16px; // 오른쪽에서 16px 떨어진 위치
  cursor: pointer;
  font-size: 32px; // 아이콘 크기
  color: var(--SECONDARY); // 아이콘 색상

  &:hover {
    color: var(--SECONDARY_DARK); // 호버시 색상
  }
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

// 사용 예제
const Modal = ({ onClose, children }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CustomCloseIcon onClick={onClose} />
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
