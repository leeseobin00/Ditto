import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import {
  CATEGORY_OPTIONS,
  getTagsForCategory,
} from "../../../utils/options.js";
import AddButton from "./AddButton";
import ClassImgAddModal from "./ClassImgAddModal";
import Clock from "../../../assets/icon/class/clock.png";
import User from "../../../assets/icon/class/user.png";
import PlusSecondary from "../../../assets/icon/common/plus-secondary.png";
import MinusSecondary from "../../../assets/icon/common/minus-secondary.png";

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
  padding-left: 10px;
`;

const SelectBox = styled.select`
  border-style: none;
  border-radius: 25px;
  color: var(--TEXT_SECONDARY);
  width: 90px;
  margin-right: 20px;
  font-size: 14px;
  padding-left: 5px;
`;

const InputClassName = styled.input`
  font-size: 30px;
  font-weight: 700;
  background-color: transparent;
  border-style: none;
  border-radius: 25px;
  height: 50px;
  padding-left: 10px;
  color: var(--LIGHT);
  margin-top: 10px;
  &::placeholder {
    color: var(--LIGHT);
  }
  &:focus {
    border-style: solid;
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const MediumFont = styled.div`
  font-size: 18px;
  color: var(--LIGHT);
`;

const MediumDetailLine = styled(MediumFont)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  margin: 5px 0;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 16px;
  height: 16px;
  margin: 0 10px;
  cursor: pointer;
  border-style: none;
  background-color: transparent;
`;

const MinusButton = styled(Button)`
  background-image: url(${MinusSecondary});
  background-size: cover;
  height: 20px;
`;

const PlusButton = styled(Button)`
  background-image: url(${PlusSecondary});
  background-size: cover;
`;

function ClassThumbnailAdd({ onChange, userNickname, initialData, isEdit }) {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [className, setClassName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORY_OPTIONS[0].value
  );
  const [selectedTag, setSelectedTag] = useState(
    getTagsForCategory(CATEGORY_OPTIONS[0].value)[0].value
  );
  const [tags, setTags] = useState(
    getTagsForCategory(CATEGORY_OPTIONS[0].value)
  );
  const [classTime, setClassTime] = useState({ hour: 0, minute: 0 });
  const [classMax, setClassMax] = useState(0);

  useEffect(() => {
    if (isEdit && initialData) {
      setClassName(initialData.className);
      setSelectedCategory(initialData.categoryId);
      setSelectedTag(initialData.tagId);
      setTags(getTagsForCategory(initialData.categoryId));
      setClassTime({
        hour: initialData.classHour,
        minute: initialData.classMinute,
      });
      setClassMax(initialData.classMax);
      setFile(initialData.file);
      setPreview(
        `http://i11a106.p.ssafy.io:8080/files/download/${initialData.file?.fileId}`
      );
    }
  }, [
    initialData?.className,
    initialData?.categoryId,
    initialData?.tagId,
    initialData?.categoryId,
    initialData?.classHour,
    initialData?.classMinute,
    initialData?.classMax,
    initialData?.file,
  ]);

  const toggleModal = () => setShowModal(!showModal);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClassName(value);
  };

  const handleFileSubmit = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (selectedFile) reader.readAsDataURL(selectedFile);
  };

  useEffect(() => {
    setTags(getTagsForCategory(selectedCategory));
    setSelectedTag(getTagsForCategory(selectedCategory)[0].value);
  }, [selectedCategory]);

  const handleCategoryChange = (e) =>
    setSelectedCategory(parseInt(e.target.value, 10));

  const handleTagChange = (e) => setSelectedTag(parseInt(e.target.value, 10));

  const incrementTime = (field) => {
    setClassTime((prevTime) => {
      if (field === "hour") {
        return { ...prevTime, hour: prevTime.hour + 1 };
      } else if (field === "minute") {
        const newMinute = prevTime.minute + 5;
        return newMinute === 60
          ? { hour: prevTime.hour + 1, minute: 0 }
          : { ...prevTime, minute: newMinute };
      }
    });
  };

  const decrementTime = (field) => {
    setClassTime((prevTime) => {
      if (field === "hour") {
        if(prevTime.hour > 0) return { ...prevTime, hour: prevTime.hour - 1 };
        else return { ...prevTime, hour: prevTime.hour};
      } else if (field === "minute" && prevTime.minute > 0) {
        return { ...prevTime, minute: prevTime.minute - 5 };
      }
    });
  };

  const incrementMax = () =>
    setClassMax((prevMax) => (prevMax < 15 ? prevMax + 1 : prevMax));
  const decrementMax = () =>
    setClassMax((prevMax) => (prevMax > 0 ? prevMax - 1 : prevMax));

  const updateThumbnailData = useCallback(() => {
    onChange({
      className,
      categoryId: selectedCategory,
      tagId: selectedTag,
      classHour: classTime.hour,
      classMinute: classTime.minute,
      classMax: classMax,
      classFile: file,
    });
  }, [
    className,
    selectedCategory,
    selectedTag,
    classTime,
    classMax,
    file,
    onChange,
  ]);

  // updateThumbnailData를 상태가 변경될 때만 호출하도록 useEffect를 설정합니다.
  useEffect(() => {
    updateThumbnailData();
  }, [
    className,
    selectedCategory,
    selectedTag,
    classTime,
    classMax,
    file,
    updateThumbnailData,
  ]);

  return (
    <ClassThumbnailAddContainer>
      <ThumbnailImg
        style={{ backgroundImage: preview ? `url(${preview})` : "none" }}
      />
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
          <SelectBox
            name="tag"
            id="tag"
            value={selectedTag}
            onChange={handleTagChange}
          >
            {tags.map((tag) => (
              <option key={tag.value} value={tag.value}>
                {tag.label}
              </option>
            ))}
          </SelectBox>
        </SelectTagContainer>
        <InputClassName
          name="className"
          id="className"
          placeholder="강의 제목을 입력해주세요."
          value={className}
          onChange={handleInputChange}
        />
        <MediumDetailLine>{userNickname}</MediumDetailLine>
        <ButtonContainer>
          <AddButton onClick={toggleModal} />
        </ButtonContainer>
        <MediumDetailLine>
          <Icon src={Clock} />
          <MediumDetailLine>
            <MediumFont>진행 시간</MediumFont>
            <MinusButton onClick={() => decrementTime("hour")} />
            <MediumFont>{classTime.hour}</MediumFont>
            <PlusButton onClick={() => incrementTime("hour")} />
            <MediumFont>시간</MediumFont>
          </MediumDetailLine>
          <MediumDetailLine>
            <MinusButton onClick={() => decrementTime("minute")} />
            <MediumFont>{classTime.minute}</MediumFont>
            <PlusButton onClick={() => incrementTime("minute")} />
            <MediumFont>분</MediumFont>
          </MediumDetailLine>
        </MediumDetailLine>
        <MediumDetailLine>
          <Icon src={User} />
          <MediumDetailLine>
            <MediumFont>최대 인원</MediumFont>
            <MinusButton onClick={decrementMax} />
            <MediumFont>{classMax}</MediumFont>
            <PlusButton onClick={incrementMax} />
            <MediumFont>명</MediumFont>
          </MediumDetailLine>
        </MediumDetailLine>
      </ClassInfoInputContainer>
    </ClassThumbnailAddContainer>
  );
}

export default ClassThumbnailAdd;
