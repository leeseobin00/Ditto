import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useAxios from "../../../hooks/useAxios";
import Modal from "../../common/Modal";
import OutlineButton from "../../common/OutlineButton";

const Title = styled.div`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 40px;
  height: 155px;
  overflow-y: auto;
`;

const AddContainer = styled(ContentContainer)`
  height: 110px;
`;

const LectureLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const Hr = styled.hr`
  margin: 8px 0;
  border: 1px solid var(--BACKGROUND_COLOR);
`;

const LectureItem = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DetailLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 10px 0;
  align-items: center;
`;

const Label = styled.div`
  width: 30%;
  font-size: 16px;
  color: var(--TEXT_SECONDARY);
`;

const SelectLabel = styled(Label)`
  width: 10%;
  text-align: right;
`;

const Input = styled.input`
  font-family: inherit;
  font-size: inherit;
  width: 70%;
  height: 30px;
  padding: 0 10px;
  font-size: 16px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: var(--BORDER_COLOR);
  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const SelectLine = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectBox = styled.select`
  font-family: inherit;
  font-size: inherit;
  width: 30%;
  height: 30px;
  padding: 0 10px;
  font-size: 16px;
  border-style: solid;
  border-radius: 5px;
  border-color: var(--BORDER_COLOR);
  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

function ClassLectureAddModal({
  show,
  onClose,
  lectureList,
  classId,
  updateLectureList,
}) {
  const hourOptions = Array.from({ length: 24 }, (_, index) => index);
  const minOptions = Array.from({ length: 12 }, (_, index) => index * 5);

  const [minDate, setMinDate] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const { sendRequest: postLecture, sendRequest: deleteLecture } = useAxios();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  const handleAddLecture = async () => {
    if (date === "") {
      alert("강의 날짜를 선택해주세요.");
      return;
    }
    const [year, month, day] = date.split("-");
    const newLecture = {
      year: parseInt(year, 10),
      month: String(month),
      day: String(day),
      hour: String(hour),
      minute: String(minute),
    };

    try {
      await postLecture(`/classes/${classId}/lectures`, newLecture, "post");
      updateLectureList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLecture = async (lectureId) => {
    try {
      await deleteLecture(
        `/classes/${classId}/lectures/${lectureId}`,
        null,
        "delete"
      );
      updateLectureList();
    } catch (error) {
      console.error(error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <Modal onClose={onClose}>
      <Title>클래스 일정 관리</Title>
      <ContentContainer>
        <Hr />
        {lectureList?.map((lecture, index) => (
          <React.Fragment key={index}>
            <LectureLine value={lecture.lectureId}>
              <LectureItem>
                <div>
                  {String(lecture.year).padStart(4, "0")}-
                  {String(lecture.month).padStart(2, "0")}-
                  {String(lecture.day).padStart(2, "0")}
                </div>
                <div>
                  {String(lecture.hour).padStart(2, "0")}:
                  {String(lecture.minute).padStart(2, "0")}
                </div>
              </LectureItem>
              <OutlineButton
                color={"ACCENT1"}
                label={"삭제"}
                size={"sm"}
                onClick={() => handleDeleteLecture(lecture.lectureId)}
              />
            </LectureLine>
            <Hr />
          </React.Fragment>
        ))}
      </ContentContainer>
      <Title>일정 추가</Title>
      <AddContainer>
        <DetailLine>
          <Label>날짜</Label>
          <Input
            type="date"
            id="date"
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </DetailLine>
        <DetailLine>
          <Label>시작 시간</Label>
          <SelectLine>
            <SelectBox value={hour} onChange={(e) => setHour(e.target.value)}>
              {hourOptions.map((option) => (
                <option key={option} value={option}>
                  {String(option).padStart(2, "0")}
                </option>
              ))}
            </SelectBox>
            <SelectLabel>시</SelectLabel>
            <SelectBox
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
            >
              {minOptions.map((option) => (
                <option key={option} value={option}>
                  {String(option).padStart(2, "0")}
                </option>
              ))}
            </SelectBox>
            <SelectLabel>분</SelectLabel>
          </SelectLine>
        </DetailLine>
      </AddContainer>
      <OutlineButton label={"추가"} onClick={handleAddLecture} />
    </Modal>
  );
}

export default ClassLectureAddModal;
