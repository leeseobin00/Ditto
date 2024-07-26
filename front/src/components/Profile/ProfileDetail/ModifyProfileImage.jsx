import { useState } from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import useFormDataAxios from "../../../hooks/useFormDataAxios";
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
  // redux
  const userId = useSelector((state) => state.auth.userId);
  // axios
  const { sendRequest: patchImage } = useFormDataAxios();

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("path/to/default/image.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (userId && profileImage) {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("file", profileImage); // Base64 데이터에서 불필요한 부분 제거

      try {
        await patchImage(`/profiles/image`, formData, "patch");
        onClose();
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    }
  };

  return (
    <>
      <ModalTitle>프로필 이미지</ModalTitle>
      <ProfileImage src={imagePreview} alt="Profile" />
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
