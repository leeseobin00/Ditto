import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useParams } from "react-router-dom";

import useAxios from "../../hooks/useAxios";
import Tag from "./Tag";
import DefaultProfileImage from "../../assets/img/profile-user.png";
import { useSelector } from "react-redux";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 32px 0px;
`;

const Image = styled.img`
  background-color: lightgray;
  width: 160px;
  height: 160px;
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
`;

const CustomFilledHeartIcon = styled(BsHeartFill)`
  color: var(--ACCENT1);
  cursor: pointer;
`;

const Tags = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

function Profile({
  profileImageURL,
  userName,
  likeCount,
  tags,
  profileId,
  postHeart,
  deleteHeart}) {
  // redux
  const userId = useSelector((state)=>state.auth.userId);
  // axios
  const {sendRequest:getHeart} = useAxios();

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [curLikeCount, setCurLikeCount] = useState(likeCount);

  const handleHeartClick = () => {
    if (isHeartFilled===true) {
      setIsHeartFilled(false);
      setCurLikeCount((prev) => prev - 1);
      deleteHeart();
    } else {
      setIsHeartFilled(true);
      setCurLikeCount((prev) => prev + 1);
      postHeart();
    }
  };

  const handleGetHeart = async() => {
    const result = await getHeart(`/profiles/${profileId}/like?seekerId=${userId}`,null, "get");
    setIsHeartFilled(result?.data);
  }

  useEffect(()=>{
    setCurLikeCount(likeCount);
    handleGetHeart();
  },[likeCount]);

  return (
    <ProfileWrapper>
      <Image src={profileImageURL || DefaultProfileImage}  alt="Profile Image"/>
      <Name>{userName}</Name>
      <LikeCount onClick={handleHeartClick}>
      {isHeartFilled ? <CustomFilledHeartIcon /> : <CustomHeartIcon />} {curLikeCount}
      </LikeCount>
      <Tags>
        {tags?.map((tag, index)=><Tag key={index} tagName={tag} />)}
      </Tags>
    </ProfileWrapper>
  );
}

export default Profile;
