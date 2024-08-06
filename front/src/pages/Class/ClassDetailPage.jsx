import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useAxios from "../../hooks/useAxios";
import ClassThumbnail from "../../components/Class/ClasDetail/ClassThumbnail";
import ClassKit from "../../components/Class/ClasDetail/ClassKit";
import ClassStepList from "../../components/Class/ClasDetail/ClassStepList";
import ReviewList from "../../components/Review/ReviewList";
import ClassQnAList from "../../components/QnA/QnAList/ClassQnAList";
import QuestionModal from "../../components/QnA/Question/QuestionModal";
import ClassSideBar from "../../components/Class/ClasDetail/ClassSideBar";
import TabBar from "../../components/Class/ClasDetail/TabBar";
import Button from "../../components/common/Button";

const ClassDetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ClassBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 1% 5%;
`;

const ClassIntroductionContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const TitleLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: var(--PRIMARY);
`;

function HTMLContent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

const ClassExplanation = styled.div`
  font-size: 18px;
  margin: 15px 0;
`;

function ClassDetailPage() {
  const titleIds = ["1", "2", "3"];

  // redux
  const userId = useSelector((state) => state.auth.userId);
  const roleId = useSelector((state) => state.auth.roleId);

  // axios
  const { sendRequest: getClassInfo, sendRequest: getLectureList } = useAxios();

  // router
  const { classId } = useParams();

  const [classInfo, setClassInfo] = useState(null);
  const [lectureList, setLectureList] = useState([]);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const qnaListRef = useRef(null);

  const handleQuestionModal = () => {
    setShowQuestionModal(!showQuestionModal);
  };

  const handleGetClass = async () => {
    try {
      const classResponse = await getClassInfo(
        `/classes/${classId}`,
        null,
        "get"
      );
      setClassInfo(classResponse?.data);

      const lectureResponse = await getLectureList(
        `/classes/${classId}/lectures`,
        null,
        "get"
      );
      setLectureList(lectureResponse?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateLectureList = async () => {
    try {
      const lectureResponse = await getLectureList(
        `/classes/${classId}/lectures`,
        null,
        "get"
      );
      setLectureList(lectureResponse?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetClass();
  }, [classId]);

  useEffect(() => {
    if (classInfo?.user?.userId == userId) {
      setIsInstructor(true);
    }
  }, [classInfo]);

  const handleQuestionSubmit = () => {};

  return (
    <ClassDetailPageContainer>
      {classInfo && (
        <>
          <ClassThumbnail
            classInfo={classInfo}
            file={classInfo?.file}
            instructor={classInfo?.user}
            tag={classInfo?.tag}
          />
          <TabBar titleIds={titleIds} />
          <ClassBody>
            <ClassIntroductionContainer>
              <ContentContainer id={titleIds[0]}>
                <Title>강의 소개</Title>
                <ClassExplanation>
                  <HTMLContent html={classInfo?.classExplanation} />
                </ClassExplanation>
                <ClassStepList steps={classInfo?.steps} />
                <ClassKit kit={classInfo?.kit} />
              </ContentContainer>
              <ContentContainer id={titleIds[1]}>
                <TitleLine>
                  <Title>리뷰</Title>
                  {/* <Button label={"리뷰작성"} /> */}
                </TitleLine>
                <ReviewList />
              </ContentContainer>
              <ContentContainer id={titleIds[2]}>
                <TitleLine>
                  <Title>Q & A</Title>
                  {roleId == 1 && (
                    <Button label={"문의하기"} onClick={handleQuestionModal} />
                  )}
                </TitleLine>
                <ClassQnAList
                  classId={classInfo?.classId}
                  userId={userId}
                  isInstructor={isInstructor}
                  onUpdate={handleQuestionSubmit}
                />
                <QuestionModal
                  show={showQuestionModal}
                  classId={classInfo?.classId}
                  userId={userId}
                  onClose={handleQuestionModal}
                  onSubmit={handleQuestionSubmit} // onSubmit 콜백 수정
                />
              </ContentContainer>
            </ClassIntroductionContainer>
            <ClassSideBar
              classInfo={classInfo}
              lectureList={lectureList}
              userId={userId}
              roleId={roleId}
              updateLectureList={updateLectureList}
            />
          </ClassBody>
        </>
      )}
    </ClassDetailPageContainer>
  );
}

export default ClassDetailPage;
