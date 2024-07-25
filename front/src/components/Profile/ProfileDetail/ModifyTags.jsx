import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";

import RoundButton from "../../common/RoundButton";
import {
  LIVING_OPTIONS,
  FABRIC_OPTIONS,
  FOOD_OPTIONS,
  ART_OPTIONS,
} from "../../../utils/options";
import useAxios from "../../../hooks/useAxios";

const ModalTitle = styled.p`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 32px;
`;

const Description = styled.p`
  color: var(--TEXT_PRIMARY);
`;

const TagButton = styled.button`
  border: 1px solid var(--SECONDARY);
  border-radius: 25px;
  padding: 4px 12px;
  font-weight: 600;
  color: var(--SECONDARY);
  background-color: ${(props) =>
    props.$selected === "true" ? "var(--TERTIARY)" : "var(--LIGHT)"};
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: var(--TERTIARY);
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
  margin-bottom: 48px;
`;

function ModifyTags({ onClose }) {
  // redux
  const userId = useSelector(state => state.auth.userId);

  // axios
  const { sendRequest: patchTags } = useAxios();

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // 필요한 태그들을 불러옵니다.
    const allTags = [
      ...LIVING_OPTIONS,
      ...FABRIC_OPTIONS,
      ...FOOD_OPTIONS,
      ...ART_OPTIONS,
    ].map((tag) => ({ ...tag, selected: false }));

    setTags(allTags);
  }, []);

  const handleTagClick = (value) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(value)) {
        setTags((prevTags) =>
          prevTags.map((tag) =>
            tag.label === value ? { ...tag, selected: false } : tag
          )
        );
        return prevSelectedTags.filter((tag) => tag !== value);
      } else if (prevSelectedTags.length < 3) {
        setTags((prevTags) =>
          prevTags.map((tag) =>
            tag.label === value ? { ...tag, selected: true } : tag
          )
        );
        return [...prevSelectedTags, value];
      }
      return prevSelectedTags;
    });
  };

  const handleSubmit = () => {
    if (userId) {
      const patchData = {};
      selectedTags.forEach((tag, index) => {
        patchData[`tag${index + 1}`] = tag;
      });

      patchTags(`/profiles/tag?userId=${userId}`, patchData, "patch");
    }

    onClose();
  };

  return (
    <>
      <ModalTitle>관심 태그</ModalTitle>
      <Description>가장 관심 있는 태그를 선택해주세요. (최대 3개)</Description>
      <TagList>
        {tags.map((tag, index) => (
          <TagButton
            key={index}
            $selected={tag.selected ? "true" : "false"}
            onClick={() => handleTagClick(tag.label)}
          >
            {tag.label}
          </TagButton>
        ))}
      </TagList>
      <RoundButton label="수정" onClick={handleSubmit} />
    </>
  );
}

export default ModifyTags;
