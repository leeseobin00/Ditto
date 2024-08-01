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
  padding: 20px;
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

function Section({
  id,
  title,
  children,
  onClick,
  isMyProfile,
  curIntro,
  handleIntro,
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
          <OutlineButton label="더보기" color="default" onClick={onClick} />
        </ButtonWrapper>
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ModalContentComponent
            curIntro={curIntro}
            handleIntro={handleIntro}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </SectionWrapper>
  );
}

export default Section;
