import { useEffect, useState } from "react";
import { styled } from "styled-components";
import DefaultProfileImage from "../../../assets/img/profile-user.png";
import axios from "axios";

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-bottom: 4px;
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  border: 1px solid var(--BACKGROUND_COLOR);
  width: 40px;
  height: 40px;
`;

const ProfileInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ProfileName = styled.span`
  color: var(--TEXT-PRIMARY);
`;

const ProfileDate = styled.span`
  color: var(--TEXT_TERTIARY);
`;

function Profile({ fileId, name, date }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [image, setImage] = useState(null);

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  
  const getImage = async() => {
    const response = await axios.get(
      `${baseUrl}/files/download/${fileId}`,
      {
        responseType: "blob",
      }
    );
    const fileBlob = response.data;
    const base64 = await toBase64(fileBlob);
    setImage(base64);
  }

  useEffect(()=>{
    getImage();
  },[fileId]);

  return (
    <ProfileWrapper>
      <ProfileImage src={image || DefaultProfileImage} alt="이미지" />
      <ProfileInfo>
        <ProfileName>{name}</ProfileName>
        <ProfileDate>{date}</ProfileDate>
      </ProfileInfo>
    </ProfileWrapper>
  );
}

export default Profile;
