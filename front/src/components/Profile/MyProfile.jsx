import { useState } from "react";
import styled from "styled-components";
import { BsHeartFill } from "react-icons/bs";
import WriteIcon from "../../assets/icon/profile/write-white.png";
import Tag from "./Tag";
import Modal from "../common/Modal";
import RoundButton from "../common/RoundButton";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 32px 0px;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  background-color: lightgray;
  width: 160px;
  height: 160px;
  border-radius: 100%;
`;

const ProfileEditButton = styled.button`
  position: absolute;
  background-color: var(--SECONDARY);
  border: none;
  border-radius: 100%;
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.position &&
    `top: ${props.position.top}; left: ${props.position.left};`}
`;

const ProfileIconImage = styled.img`
  width: 16px;
  height: 16px;
`;

const Name = styled.p`
  margin-top: 16px;
`;

const LikeCount = styled.p`
  display: flex;
  gap: 4px;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const CustomFilledHeartIcon = styled(BsHeartFill)`
  color: var(--ACCENT1);
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const TagsEditButton = styled.button`
  background-color: var(--SECONDARY);
  border: none;
  border-radius: 100%;
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const ModalTitle = styled.p`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 32px;
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 2px solid orange;
  margin-bottom: 16px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  color: var(--SECONDARY);
  margin-bottom: 48px;
  cursor: pointer;
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

function Profile() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [tags, setTags] = useState([
    { name: "향수", selected: false },
    { name: "양초", selected: false },
    { name: "비누", selected: false },
    { name: "뜨개질", selected: true },
    { name: "바느질", selected: false },
    { name: "가죽", selected: false },
    { name: "십자수", selected: false },
    { name: "키링", selected: false },
    { name: "모빌", selected: false },
    { name: "미니어쳐", selected: false },
    { name: "푸드", selected: true },
  ]);

  const handleProfileEditClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleTagsEditClick = () => {
    setIsTagsModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleCloseTagsModal = () => {
    setIsTagsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTagClick = (index) => {
    const newTags = [...tags];
    const selectedCount = newTags.filter((tag) => tag.selected).length;
    if (newTags[index].selected || selectedCount < 3) {
      newTags[index].selected = !newTags[index].selected;
      setTags(newTags);
    }
  };

  return (
    <ProfileWrapper>
      <ImageWrapper>
        <Image
          src={profileImage || "path/to/default/image.png"}
          alt="Profile"
        />
        <ProfileEditButton
          position={{ top: "10px", left: "120px" }}
          onClick={handleProfileEditClick}
        >
          <ProfileIconImage src={WriteIcon} alt="Edit Icon" />
        </ProfileEditButton>
      </ImageWrapper>
      <Name>김디토</Name>
      <LikeCount>
        <CustomFilledHeartIcon /> 1024
      </LikeCount>
      <Tags>
        <Tag tagName="향수" />
        <Tag tagName="뜨개질" />
        <TagsEditButton onClick={handleTagsEditClick}>
          <ProfileIconImage src={WriteIcon} alt="Edit Icon" />
        </TagsEditButton>
      </Tags>

      {isProfileModalOpen && (
        <Modal onClose={handleCloseProfileModal}>
          <ModalContent>
            <ModalTitle>프로필 이미지</ModalTitle>
            <ProfileImage
              src={profileImage || "path/to/default/image.png"}
              alt="Profile"
            />
            <FileInputLabel htmlFor="file-upload">파일 선택</FileInputLabel>
            <FileInput
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <RoundButton label="수정" onClick={handleCloseProfileModal} />
          </ModalContent>
        </Modal>
      )}

      {isTagsModalOpen && (
        <Modal onClose={handleCloseTagsModal}>
          <ModalContent>
            <ModalTitle>관심 태그</ModalTitle>
            <p>가장 관심 있는 태그를 선택해주세요. (최대 3개)</p>
            <TagList>
              {tags.map((tag, index) => (
                <TagButton
                  key={tag.name}
                  $selected={tag.selected}
                  onClick={() => handleTagClick(index)}
                >
                  {tag.name}
                </TagButton>
              ))}
            </TagList>
            <RoundButton label="수정" onClick={handleCloseTagsModal} />
          </ModalContent>
        </Modal>
      )}
    </ProfileWrapper>
  );
}

export default Profile;
