import { useState, useEffect } from "react";

import styled from "styled-components";

import useAxios from "../../../hooks/useAxios";
import UserIcon from "../../../assets/icon/class/user-count.png";
import RoundButton from "../../common/RoundButton";
import Dollar from "../../../assets/icon/class/dollar.png";
import EmptyHeart from "../../../assets/icon/common/heart/heart-secondary.png";
import ActivatedHeart from "../../../assets/icon/common/heart/heart-activated.png";
import ClassLectureModal from "./ClassLectureModal";

const ClassSideBarConatiner = styled.div`
  position: sticky;
  top: 85px;
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 270px;
  border-style: solid;
  border-width: 0.5px;
  border-radius: 10px;
  border-color: var(--BORDER_COLOR);
  padding: 15px;
  box-shadow: 1px 1px 5px #767676;
  margin-top: 25px;
  margin-left: 15px;
  justify-content: space-between;
  z-index: 8;
`;

const ClassPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const ClassPrice = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: var(--PRIMARY);
`;

const SelectBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 130px;
  justify-content: space-between;
`;

const SelectBox = styled.select`
  border-radius: 25px;
  border-color: var(--BORDER_COLOR);
  height: 40px;
  font-size: 16px;
  padding-left: 10px;
  color: var(--TEXT_SECONDARY);
  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const UserCountICon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

const StudentsNum = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin: 10px 0;
`;

const LikeContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const LikeButton = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0px 0px 2px rgb(237, 43, 43));
  }
`;

const LikeCount = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
`;

const formatNumber = (number) => {
  return number.toLocaleString();
};

function ClassSideBar({
  classInfo,
  lectureList,
  userId,
  roleId,
  updateLectureList,
}) {
  const [likeCount, setLikeCount] = useState(classInfo.likeCount);
  const [isLike, setIsLike] = useState(false);
  const [heartActivated, setHeartActivated] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(
    lectureList && lectureList.length > 0 ? lectureList[0] : null
  );
  const [lectureUserCount, setLectureUserCount] = useState(
    selectedLecture ? selectedLecture.userCount : 0
  );
  const [showModal, setShowModal] = useState(false);
  const {
    sendRequest: getIsLike,
    sendRequest: postLike,
    sendRequest: deleteLike,
  } = useAxios();

  const handleGetIsLike = async () => {
    if (userId == null) {
      return;
    }

    if (roleId == 2) {
      setHeartActivated(true);
      return;
    }

    try {
      const getIsLikeResponse = await getIsLike(
        `/classes/${classInfo?.classId}/like?userId=${userId}`,
        null,
        "get"
      );
      setIsLike(getIsLikeResponse.data);
      setHeartActivated(getIsLikeResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostLike = async () => {
    if (userId == null) {
      alert("회원만 좋아요 기능을 이용할 수 있습니다.");
      return;
    }

    try {
      await postLike(
        `/classes/${classInfo?.classId}/likes`,
        { userId: userId },
        "post"
      );
      setLikeCount(likeCount + 1);
      setHeartActivated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLike = async () => {
    if (userId == null) {
      alert("회원만 좋아요 기능을 이용할 수 있습니다.");
      return;
    }

    if (roleId == 2) {
      alert("강사는 클래스 좋아요 기능을 이용할 수 없습니다.");
      return;
    }

    try {
      await deleteLike(
        `/classes/${classInfo?.classId}/likes`,
        { userId: userId },
        "delete"
      );
      setLikeCount(likeCount - 1);
      setHeartActivated(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetIsLike();
  }, [classInfo?.classId, userId]);

  const handleSelectChange = (event) => {
    const selectedLectureId = event.target.value;
    const lecture =
      lectureList.find((lecture) => lecture.lectureId === selectedLectureId) ||
      {};
    setSelectedLecture(lecture);
  };

  useEffect(() => {
    setLectureUserCount(selectedLecture ? selectedLecture.userCount : 0);
  }, [selectedLecture]);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ClassSideBarConatiner>
      <ClassPriceContainer>
        <Icon src={Dollar} />
        <ClassPrice>{formatNumber(classInfo.classPrice)}</ClassPrice>
      </ClassPriceContainer>
      <hr />
      <SelectBoxContainer>
        {lectureList && lectureList.length > 0 ? (
          <>
            <SelectBox onChange={handleSelectChange}>
              {lectureList.map((lecture, index) => (
                <option key={index} value={lecture.lectureId}>
                  {String(lecture.year).padStart(4, "0")}-
                  {String(lecture.month).padStart(2, "0")}-
                  {String(lecture.day).padStart(2, "0")}&nbsp;
                  {String(lecture.hour).padStart(2, "0")}:
                  {String(lecture.minute).padStart(2, "0")}
                </option>
              ))}
            </SelectBox>
            <StudentsNum>
              <UserCountICon src={UserIcon} />
              {lectureUserCount == null ? "0" : `${lectureUserCount}`}
              &nbsp;/&nbsp;{classInfo.classMax}
            </StudentsNum>
          </>
        ) : (
          <StudentsNum>강의가 없습니다.</StudentsNum>
        )}
        {classInfo.user.userId == userId ? (
          <RoundButton
            label={"클래스 일정 관리"}
            size={"md"}
            onClick={handleShowModal}
          />
        ) : (
          <RoundButton label={"구매하기"} size="md" />
        )}
      </SelectBoxContainer>
      <ClassLectureModal
        lectureList={lectureList || []}
        classId={classInfo.classId}
        updateLectureList={updateLectureList}
        show={showModal}
        onClose={handleShowModal}
      />
      <LikeContainer>
        <LikeButton
          src={heartActivated ? ActivatedHeart : EmptyHeart}
          onClick={heartActivated ? handleDeleteLike : handlePostLike}
        />
        <LikeCount>{formatNumber(likeCount)}</LikeCount>
      </LikeContainer>
    </ClassSideBarConatiner>
  );
}

export default ClassSideBar;
