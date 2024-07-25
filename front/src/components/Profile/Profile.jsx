import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import Tag from "./Tag";

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
  gap: 8px;
  margin-top: 16px;
`;

function Profile({heartStatus, postHeart, deleteHeart}) {
  console.log("heartStatus",heartStatus);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(1024);

  const handleHeartClick = () => {
    if (isHeartFilled===true) {
      setIsHeartFilled(false);
      setLikeCount((prev) => prev - 1);
      deleteHeart();
    } else {
      console.log("ss");
      setIsHeartFilled(true);
      setLikeCount((prev) => prev + 1);
      postHeart();
    }
  };

  useEffect(()=>{
    setIsHeartFilled(heartStatus);
  },[heartStatus]);

  return (
    <ProfileWrapper>
      <Image />
      <Name>김디토</Name>
      <LikeCount onClick={handleHeartClick}>
      {isHeartFilled ? <CustomFilledHeartIcon /> : <CustomHeartIcon />} {likeCount}
      </LikeCount>
      <Tags>
        <Tag tagName="향수" />
        <Tag tagName="뜨개질" />
      </Tags>
    </ProfileWrapper>
  );
}

export default Profile;
