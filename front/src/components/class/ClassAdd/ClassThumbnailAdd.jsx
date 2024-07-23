import React, { useState } from "react";
import { styled } from "styled-components";

import {
  CATEGORY_OPTIONS,
  getTagsForCategory,
} from "../../../utils/options.js";
import AddButton from "./AddButton";
import ClassImgAddModal from "./ClassImgAddModal";

const ClassThumbnailAddContainer = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
`;

const ThumbnailImg = styled.div`
  width: 100vw;
  height: 350px;
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  background-color: var(--BACKGROUND_COLOR);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
    pointer-events: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  padding-right: 5%;
`;

const ClassInfoInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const SelectTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
`;

const SelectBox = styled.select`
  border-style: none;
  border-radius: 10px;
  color: var(--TEXT_SECONDARY);
  width: 80px;
`;

function ClassThumbnailAdd({ userNickname }) {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFileSubmit = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORY_OPTIONS[0].value
  );
  const [tags, setTags] = useState(getTagsForCategory(selectedCategory));

  const handleCategoryChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedCategory(selectedValue);
    setTags(getTagsForCategory(selectedValue));
  };

  return (
    <ClassThumbnailAddContainer>
      <ThumbnailImg
        style={{ backgroundImage: preview ? `url(${preview})` : "none" }}
      />
      <ButtonContainer>
        <AddButton onClick={toggleModal} />
      </ButtonContainer>
      <ClassImgAddModal
        show={showModal}
        modalTitle={"클래스 썸네일 등록"}
        onClose={toggleModal}
        onChange={handleFileSubmit}
      />
      <ClassInfoInputContainer>
        <SelectTagContainer>
          <SelectBox
            name="category"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectBox>
          <SelectBox name="tag" id="tag">
            {tags.map((tag) => (
              <option key={tag.value} value={tag.value}>
                {tag.label}
              </option>
            ))}
          </SelectBox>
        </SelectTagContainer>
      </ClassInfoInputContainer>
    </ClassThumbnailAddContainer>
  );
}

export default ClassThumbnailAdd;
