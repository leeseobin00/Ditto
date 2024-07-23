import { useState } from "react";
import { styled } from "styled-components";

import RoundButton from "../../common/RoundButton";

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

function ModifyProfileImage({ onClose }) {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = () => {
    onClose();
  };

  return (
    <>
      {" "}
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
      <RoundButton label="수정" onClick={handleSubmit} />
    </>
  );
}

export default ModifyProfileImage;
