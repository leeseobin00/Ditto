import { useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import Tag from "./Tag";
import DefaultProfileImage from "../../assets/img/default-user.png";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 303px;
  margin: 20px 0px;
`;

const ProfileTopWrapper = styled.div`
  height: 230px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  background-color: lightgray;
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 100%;
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

const CustomHeartIcon = styled(BsHeart)`
  color: var(--TEXT_SECONDARY);
  cursor: pointer;
  margin-right: 10px;
`;

const CustomFilledHeartIcon = styled(BsHeartFill)`
  color: var(--ACCENT1);
  cursor: pointer;
  margin-right: 10px;
`;

const Tags = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const NoTagText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: var(--TEXT_SECONDARY);
  width: 100%;
`;

function Profile({
  profileImageURL,
  profileImageId,
  userName,
  likeCount,
  tags,
  profileId,
  postHeart,
  deleteHeart,
  isDetail = false,
}) {
  // redux
  const userId = useSelector((state) => state.auth.userId);
  // axios
  const { sendRequest: getHeart } = useAxios();
  const [profileImage, setProfileImage] = useState(profileImageURL);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [curLikeCount, setCurLikeCount] = useState(likeCount);
  const [isanimating, setIsAnimating] = useState(false);

  const handleHeartClick = () => {
    if (!userId) return;

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);

    if (isHeartFilled === true) {
      setIsHeartFilled(false);
      setCurLikeCount((prev) => prev - 1);
      deleteHeart();
    } else {
      setIsHeartFilled(true);
      setCurLikeCount((prev) => prev + 1);
      postHeart();
    }
  };

  const handleGetHeart = async () => {
    const result = await getHeart(
      `/profiles/${profileId}/like?seekerId=${userId}`,
      null,
      "get"
    );
    setIsHeartFilled(result?.data);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const getImageFromId = async (fileId) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const response = await axios.get(`${baseUrl}/files/download/${fileId}`, {
      responseType: "blob",
    });
    const fileBlob = response.data;
    const base64 = await toBase64(fileBlob);
    setProfileImage(base64);
  };

  useEffect(() => {
    if (profileImageURL) {
      setProfileImage(profileImageURL);
    }
    if (!profileImageURL && profileImageId) {
      getImageFromId(profileImageId);
    }
  }, [profileImageURL, profileImageId]);

  useEffect(() => {
    setCurLikeCount(likeCount);
    handleGetHeart();
  }, [likeCount]);

  return (
    <ProfileWrapper>
      <ProfileTopWrapper>
        <Link to={`/profile/${profileId}`}>
          <Image
            src={profileImage || DefaultProfileImage}
            alt="Profile Image"
          />
        </Link>
        <Link to={`/profile/${profileId}`}>
          <Name>{userName}</Name>
        </Link>
        <LikeCount onClick={handleHeartClick}>
          {isHeartFilled ? <CustomFilledHeartIcon /> : <CustomHeartIcon />}
          {curLikeCount}
        </LikeCount>
      </ProfileTopWrapper>
      <Tags>
        {tags?.length === 0 && isDetail && (
          <NoTagText>현재 등록된 태그가 없습니다.</NoTagText>
        )}
        {tags?.map((tag, index) => (
          <Tag key={index} tagName={tag} />
        ))}
      </Tags>
    </ProfileWrapper>
  );
}

export default Profile;
