import { useState } from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";

import useFormDataAxios from "../../../hooks/useFormDataAxios";
import OutlineButton from "../../common/OutlineButton";
import DefaultProfileImage from "../../../assets/img/profile-user.png";

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
  box-shadow: 4px 4px 8px rgba(152, 146, 138, 0.7);
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  color: var(--SECONDARY);
  margin: 25px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  justify-content: center;
  background-color: var(--BORDER_COLOR);
  border-radius: 20px;
  width: 85px;
  height: 28px;
  text-align: center;
  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

function ModifyProfileImage({ curProfileImage, handleProfileImage, onClose }) {
  // redux
  const userId = useSelector((state) => state.auth.userId);
  const { sendRequest: patchImage } = useFormDataAxios();
  const { sendRequest: deleteImage } = useFormDataAxios();
  const [image, setImage] = useState(curProfileImage);
  const [imagePreview, setImagePreview] = useState(image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    console.log(image);
    if (userId && image !== null) {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("file", image);

      await patchImage(`/profiles/image`, formData, "patch");
      handleProfileImage(URL.createObjectURL(image));
      onClose();
    }
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("file", image);

    await deleteImage(`/profiles/image`, formData, "delete");
    setImage(null);
    setImagePreview(null);
    handleProfileImage(null);
    onClose();
  };

  return (
    <>
      <ModalTitle>프로필 이미지</ModalTitle>
      <ProfileImage
        src={imagePreview || DefaultProfileImage}
        alt="Profile Image"
      />
      <FileInputLabel htmlFor="file-upload">파일 선택</FileInputLabel>
      <FileInput
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <ButtonsWrapper>
        <OutlineButton label="수정" onClick={handleSubmit} />
        <OutlineButton label="삭제" color="ACCENT1" onClick={handleDelete} />
      </ButtonsWrapper>
    </>
  );
}

export default ModifyProfileImage;
