import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import Star from "../../../assets/icon/class/star.png";
import Clock from "../../../assets/icon/class/clock.png";
import User from "../../../assets/icon/class/user.png";

const ClassThumbnailContainer = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
`;

const ThumbnailImg = styled.div`
  width: 100vw;
  height: 350px;
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
    pointer-events: none;
  }
`;

const ClassTitle = styled.div`
  display: flex;
  flex-direction: column;
  height: 90px;
  justify-content: space-between;
  margin-bottom: 20px;
  z-index: 1;
`;

const LightColor = styled.div`
  color: var(--LIGHT);
`;

const SecondaryColor = styled.div`
  color: var(--SECONDARY);
  font-size: 16px;
`;

const MediumFont = styled(LightColor)`
  font-size: 18px;
`;

const ClassName = styled(LightColor)`
  font-size: 30px;
  font-weight: 700;
`;

const ClassDetailLine = styled(LightColor)`
  display: flex;
  align-items: center;
  margin-top: 10px;
  z-index: 1;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

function ClassThumbnail({ classInfo, file, instructor, tag }) {
  const navigate = useNavigate();

  const handleInstructorClick = () => {
    navigate(`/profile/${instructor.userId}`);
  };

  return (
    <ClassThumbnailContainer>
      <ThumbnailImg
        style={{
          backgroundImage: `url(http://i11a106.p.ssafy.io:8080/files/download/${file.fileId})`,
        }}
      />
      <ClassTitle>
        <SecondaryColor>#{tag.tagName}</SecondaryColor>
        <ClassName>{classInfo.className}</ClassName>
        <MediumFont
          onClick={handleInstructorClick}
          style={{ cursor: "pointer" }}
        >
          {instructor.nickname}
        </MediumFont>
      </ClassTitle>
      <ClassDetailLine>
        <Icon src={Star} />
        <MediumFont>{classInfo.averageRating.toFixed(1)}</MediumFont>
        <MediumFont>&nbsp;({classInfo.reviewCount})</MediumFont>
      </ClassDetailLine>
      <ClassDetailLine>
        <Icon src={Clock} />
        <MediumFont>{classInfo.classHour}시간</MediumFont>
        <MediumFont>&nbsp;{classInfo.classMinute}분</MediumFont>
      </ClassDetailLine>
      <ClassDetailLine>
        <Icon src={User} />
        <MediumFont>최대 인원</MediumFont>
        <MediumFont>&nbsp;{classInfo.classMax}명</MediumFont>
      </ClassDetailLine>
    </ClassThumbnailContainer>
  );
}

export default ClassThumbnail;
