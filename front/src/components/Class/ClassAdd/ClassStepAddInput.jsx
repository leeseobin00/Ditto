import React, { useState } from "react";
import { styled } from "styled-components";
import Swal from "sweetalert2";

import OutlineButton from "../../common/OutlineButton";
import AddButton from "./AddButton";
import ClassImgAddModal from "./ClassImgAddModal";

const AddContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  background-color: var(--TERTIARY);
  padding: 2%;
  border-radius: 10px;
  align-items: center;
  margin: 10px 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 30px;
`;

const StepNo = styled.div`
  background-color: var(--SECONDARY);
  width: 25px;
  height: 25px;
  color: var(--LIGHT);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 20px;
  font-weight: 600;
  margin-right: 10px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3px 0;
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const NameInput = styled.input`
  font-family: inherit;
  font-size: inherit;
  font-size: 18px;
  font-weight: 600;
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

const ExplanationInput = styled.textarea`
  font-family: inherit;
  font-size: inherit;
  font-size: 16px;
  width: 70%;
  height: 150px;
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

function ClassStepAddInput({ show, onSubmit, stepNo }) {
  if (!show) {
    return null;
  }

  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [stepName, setStepName] = useState("");
  const [stepDetail, setStepDetail] = useState("");

  const toggleModal = () => setShowModal(!showModal);

  const handleFileSubmit = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (selectedFile) reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = () => {
    if (stepName.length > 0 && stepDetail.length > 0 && file != null) {
      onSubmit({ stepNo: 0, stepName, stepDetail, file, preview });
    } else {
      Swal.fire({
        title: "입력 오류",
        text: "입력 내용을 확인해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
    }
  };

  return (
    <AddContainer>
      <InputContainer>
        <StepNo>{stepNo}</StepNo>
        <Detail>
          <NameInput
            type="text"
            placeholder="제목을 입력해주세요."
            value={stepName}
            onChange={(e) => setStepName(e.target.value)}
          />
          <DetailBox>
            <ExplanationInput
              placeholder="내용을 입력해주세요."
              value={stepDetail}
              onChange={(e) => setStepDetail(e.target.value)}
            />
            <ImgInputContainer
              style={{ backgroundImage: preview ? `url(${preview})` : "none" }}
            >
              <AddButton size="sm" onClick={toggleModal} />
              <ClassImgAddModal
                show={showModal}
                modalTitle={"진행 과정 이미지 등록"}
                onClose={toggleModal}
                onChange={handleFileSubmit}
              />
            </ImgInputContainer>
          </DetailBox>
        </Detail>
      </InputContainer>
      <OutlineButton size={"sm"} label={"추가"} onClick={handleSubmit} />
    </AddContainer>
  );
}

export default ClassStepAddInput;
