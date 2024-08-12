import { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { ProfileContext } from "../../../pages/Profile/ProfileDetailPage";

import RoundButton from "../../common/RoundButton";
import {
  LIVING_OPTIONS,
  FABRIC_OPTIONS,
  FOOD_OPTIONS,
  ART_OPTIONS,
} from "../../../utils/options";
import useAxios from "../../../hooks/useAxios";
import Swal from 'sweetalert2'; 

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
  const { tags: curTags, setTags: updateTags } = useContext(ProfileContext);
  
  // redux
  const userId = useSelector(state => state.auth.userId);

  // axios
  const { sendRequest: patchTags } = useAxios();

  const [tags, setTags] = useState(curTags);
  const [selectedTags, setSelectedTags] = useState(curTags);

  useEffect(() => {
    // 필요한 태그들을 불러옵니다.
    const allTags = [
      ...LIVING_OPTIONS,
      ...FABRIC_OPTIONS,
      ...FOOD_OPTIONS,
      ...ART_OPTIONS,
    ].map((tag) => ({
      ...tag,
      selected: curTags.includes(tag.label),
    }));

    setTags(allTags);
  }, [curTags]);

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

  const handleSubmit = async () => {
    if (userId) {
      const patchData = {};
      selectedTags.forEach((tag, index) => {
        patchData[`tag${index + 1}`] = tag;
      });

      try {
        await patchTags(`/profiles/tag?userId=${userId}`, patchData, "patch");
        updateTags(selectedTags);
        onClose();
        Swal.fire({
          title: '수정 완료',
          text: '관심 태그가 성공적으로 수정되었습니다.',
          icon: 'success',
          confirmButtonColor: '#FF7F50', // 선명한 주황색
          confirmButtonText: '확인'
        });
      } catch (error) {
        console.error("Failed to update tags:", error);
        Swal.fire({
          title: '수정 실패',
          text: '관심 태그 수정 중 오류가 발생했습니다.',
          icon: 'error',
          confirmButtonColor: '#FF7F50', // 선명한 주황색
          confirmButtonText: '확인'
        });
      }
    }
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
