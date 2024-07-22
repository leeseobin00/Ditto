import { useState } from "react";
import { styled } from "styled-components";

import OutlineButton from "../../common/OutlineButton";
import Modal from "../../common/Modal";
import WriteIcon from "../../../assets/icon/profile/write-white.png";

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 32px;
  margin-bottom: 60px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const SectionTitle = styled.p`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 22px;
  width: 100%;
  max-width: 1024px;
  margin-bottom: 32px;
`;

const EditButton = styled.button`
  background-color: var(--SECONDARY);
  border: none;
  border-radius: 100%;
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 16px;
  height: 16px;
`;

const ButtonWrapper = styled.div`
  margin-top: 32px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

function Section({
  id,
  title,
  children,
  onClick,
  isMyProfile,
  modalContent: ModalContentComponent,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SectionWrapper id={id}>
      <TitleWrapper>
        <SectionTitle>{title}</SectionTitle>
        {isMyProfile && (
          <EditButton onClick={handleOpenModal}>
            <Image src={WriteIcon} alt="Edit Icon" />
          </EditButton>
        )}
      </TitleWrapper>
      {children}
      {onClick && (
        <ButtonWrapper>
          <OutlineButton label="더보기" color="default" />
        </ButtonWrapper>
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ModalContent>
            <ModalContentComponent />
          </ModalContent>
        </Modal>
      )}
    </SectionWrapper>
  );
}

export default Section;
