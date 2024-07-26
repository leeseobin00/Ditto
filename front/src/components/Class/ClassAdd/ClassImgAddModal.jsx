import React, { useState } from "react";
import { styled } from "styled-components";

import Modal from "../../common/Modal";
import OutlineButton from "../../common/OutlineButton";

const Title = styled.div`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 45px;
`;

const ClassModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  width: 85%;
  justify-content: space-between;
  align-items: center;
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 30px;
  align-items: center;
  justify-content: space-between;
`;

const HiddenFileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const FileInput = styled.input`
  border-style: solid;
  border-width: 1px;
  border-radius: 20px;
  border-color: var(--BORDER_COLOR);
  height: 100%;
  width: 70%;
  margin-right: 10px;
  color: var(--TEXT_SECONDARY);
  padding-left: 10px;
  font-size: 14px;
  &:focus {
    border-width: 2px;
    border-color: var(--PRIMARY);
    outline: none;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  justify-content: center;
  background-color: var(--BORDER_COLOR);
  cursor: pointer;
  height: 100%;
  width: 80px;
  text-align: center;
  border-radius: 20px;
`;

function ClassImgAddModal({ show, modalTitle, onClose, onChange }) {
  const [fileName, setFileName] = useState("첨부파일");

  if (!show) {
    return null;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(event);
    } else {
      setFileName("첨부파일");
    }
  };

  const handleModalClose = () => {
    onClose();
  };

  return (
    <Modal onClose={handleModalClose}>
      <Title>{modalTitle}</Title>
      <ClassModalContent>
        <FileUploadContainer>
          <FileInput value={fileName} readOnly placeholder="첨부파일" />
          <HiddenFileInput type="file" id="file" onChange={handleFileChange} />
          <Label htmlFor="file">파일찾기</Label>
        </FileUploadContainer>
        <OutlineButton size={"sm"} label={"등록"} onClick={handleModalClose} />
      </ClassModalContent>
    </Modal>
  );
}

export default ClassImgAddModal;
