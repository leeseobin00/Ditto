import styled from "styled-components";

import Modal from "../common/Modal";
import AddressList from "./AddressList";
import OutlineButton from "../common/OutlineButton";

const Title = styled.div`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
`;

const ContentContainer = styled.div`
  margin-top: 25px;
  margin-bottom: 40px;
  width: 100%;
  max-height: 350px;
  overflow: auto;
`;

function AddressListModal({ show, onClose }) {
  if (!show) return null;

  return (
    <Modal onClose={onClose}>
      <Title>배송지 목록</Title>
      <ContentContainer>
        <AddressList />
      </ContentContainer>
      <OutlineButton label={"선택"} />
    </Modal>
  );
}

export default AddressListModal;
