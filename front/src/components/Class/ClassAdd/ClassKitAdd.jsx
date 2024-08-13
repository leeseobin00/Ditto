import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

import AddButton from "./AddButton";
import ClassImgAddModal from "./ClassImgAddModal";

const KitAddContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-style: solid;
  border-width: 0.5px;
  border-radius: 10px;
  border-color: var(--BORDER_COLOR);
  padding: 2%;
  justify-content: space-between;
  margin: 25px 0;
`;

const ImgInputContainer = styled.div`
  width: 25%;
  height: 150px;
  margin-right: 5px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  background-color: var(--BACKGROUND_COLOR);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ClassKitDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: space-between;
  padding: 15px 0;
`;

const KitNameInput = styled.input`
  font-family: inherit;
  font-size: inherit;
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  margin-bottom: 15px;
  background-color: transparent;
  border-style: none;
  border-radius: 25px;
  padding: 2px 10px;
  &::placeholder {
    color: var(--DARK);
  }
  &:focus {
    border-style: solid;
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const KitExplanationInput = styled.textarea`
  font-family: inherit;
  font-size: inherit;
  font-size: 16px;
  width: 100%;
  height: 110px;
  padding: 10px;
  background-color: transparent;
  border-style: dashed;
  border-radius: 10px;
  border-width: 2px;
  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
  overflow-wrap: break-word;
  overflow-y: auto;
  resize: none;
`;

function ClassKitAdd({ onChange }) {
  const [showModal, setShowModal] = useState(false);
  const [kitName, setKitName] = useState("");
  const [kitExplanation, setKitExplanation] = useState("");
  const [kitFile, setKitFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const toggleModal = () => setShowModal(!showModal);

  const handleFileSubmit = (e) => {
    const selectedFile = e.target.files[0];
    setKitFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (selectedFile) reader.readAsDataURL(selectedFile);
  };

  const handleKitNameChange = (e) => {
    setKitName(e.target.value);
  };

  const handleKitExplanationChange = (e) => {
    setKitExplanation(e.target.value);
  };

  useEffect(() => {
    const kitData = { kitName, kitExplanation, kitFile };
    onChange(kitData);
  }, [kitName, kitExplanation, kitFile]);

  return (
    <KitAddContainer>
      <ImgInputContainer
        style={{ backgroundImage: preview ? `url(${preview})` : "none" }}
      >
        <AddButton size="sm" onClick={toggleModal} />
        <ClassImgAddModal
          show={showModal}
          modalTitle={"제공 키트 이미지 등록"}
          onClose={toggleModal}
          onChange={handleFileSubmit}
        />
      </ImgInputContainer>
      <ClassKitDetail>
        <KitNameInput
          type="text"
          placeholder="키트 이름을 입력해주세요."
          value={kitName}
          onChange={handleKitNameChange}
        />
        <KitExplanationInput
          placeholder="키트 구성품과 설명을 입력해주세요."
          value={kitExplanation}
          onChange={handleKitExplanationChange}
        />
      </ClassKitDetail>
    </KitAddContainer>
  );
}

export default ClassKitAdd;
