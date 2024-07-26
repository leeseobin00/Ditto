import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BsHeartFill } from "react-icons/bs";

import WriteIcon from "../../assets/icon/profile/write-white.png";
import Modal from "../common/Modal";
import RoundButton from "../common/RoundButton";

import ModifyTags from "./ProfileDetail/ModifyTags";
import Tag from "./Tag";
import ModifyProfileImage from "./ProfileDetail/ModifyProfileImage";

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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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

function MyProfile({userName, likeCount, tags, refresh}) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileEditClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleTagsEditClick = () => {
    setIsTagsModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
    refresh();
  };

  const handleCloseTagsModal = () => {
    setIsTagsModalOpen(false);
    refresh();
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
      <Name>{userName}</Name>
      <LikeCount>
        <CustomFilledHeartIcon /> {likeCount}
      </LikeCount>
      <Tags>
        {tags?.map((tag, index)=><Tag key={index} tagName={tag} />)}
        <TagsEditButton onClick={handleTagsEditClick}>
          <ProfileIconImage src={WriteIcon} alt="Edit Icon" />
        </TagsEditButton>
      </Tags>

      {isProfileModalOpen && (
        <Modal onClose={handleCloseProfileModal}>
          <ModifyProfileImage onClose={handleCloseProfileModal} />
        </Modal>
      )}

      {isTagsModalOpen && (
        <Modal onClose={handleCloseTagsModal}>
          <ModifyTags onClose={handleCloseTagsModal} />
        </Modal>
      )}
    </ProfileWrapper>
  );
}

export default MyProfile;
