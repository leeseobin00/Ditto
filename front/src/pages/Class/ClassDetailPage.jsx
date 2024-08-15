import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useAxios from "../../hooks/useAxios";
import ClassThumbnail from "../../components/Class/ClasDetail/ClassThumbnail";
import ClassKit from "../../components/Class/ClasDetail/ClassKit";
import ClassStepList from "../../components/Class/ClasDetail/ClassStepList";
import ClassReviewList from "../../components/Review/ClassReviewList";
import ClassQnAList from "../../components/QnA/QnAList/ClassQnAList";
import QuestionModal from "../../components/QnA/Question/QuestionModal";
import ClassSideBar from "../../components/Class/ClasDetail/ClassSideBar";
import TabBar from "../../components/Class/ClasDetail/TabBar";
import Button from "../../components/common/Button";
import ReviewPostModal from "../../components/Review/ReviewPostModal";

const ClassDetailPageContainer = styled.div`
  position: relative;
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
  const {
    sendRequest: getClassInfo,
    sendRequest: getReviewList,
    sendRequest: getLectureList,
    sendRequest: getCanReview,
  } = useAxios();

  // router
  const { classId } = useParams();

  const [classInfo, setClassInfo] = useState(null);
  const [lectureList, setLectureList] = useState([]);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);

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
    if (userId === null) setIsInstructor(false);
    else if (classInfo?.user?.userId == userId) {
      setIsInstructor(true);
    }
  }, [classInfo]);

  const handleQuestionSubmit = () => {};

  // 리뷰 조회 기능
  const [reviewList, setReviewList] = useState([]);
  const [curReviewPage, setCurReviewPage] = useState(1);
  const [totalReviewPage, setTotalReviewPage] = useState();

  const handleGetReviewList = async () => {
    try {
      const response = await getReviewList(
        `/classes/${classId}/reviews?page=${curReviewPage}`,
        null,
        "get"
      );
      setReviewList(response?.data?.reviews);
      setCurReviewPage(curReviewPage + 1);
      setTotalReviewPage(response?.data?.totalPageCount);
    } catch (error) {
      console.error(error);
    }
  };

  // 리뷰 작성 기능
  const [canReview, setCanReview] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [canReviewLectures, setCanReviewLectures] = useState([]);

  const handleCanReview = async () => {
    try {
      const response = await getCanReview(
        `/classes/${classId}/completed-lectures/reviews?userId=${userId}`,
        null,
        "get"
      );
      if (response?.data) {
        setCanReview(true);
        setCanReviewLectures(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  useEffect(() => {
    handleGetClass();
    handleGetReviewList();
    if (userId) {
      handleCanReview();
    }
  }, [classId]);

  const handleReviewUpdate = async () => {
    try {
      setCurReviewPage(1);
      const response = await getReviewList(
        `/classes/${classId}/reviews?page=${curReviewPage}`,
        null,
        "get"
      );
      setReviewList(response?.data?.reviews);
      setCurReviewPage(2);
      setTotalReviewPage(response?.data?.totalPageCount);
    } catch (error) {
      console.error(error);
    }
  };

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
          <TabBar
            classId={classId}
            titleIds={titleIds}
            isInstructor={isInstructor}
          />
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
                  {canReview && (
                    <Button label={"리뷰작성"} onClick={handleReviewModal} />
                  )}
                </TitleLine>
                <ClassReviewList
                  reviewList={reviewList}
                  totalReviewPage={totalReviewPage}
                  curReviewPage={curReviewPage}
                  onUpdate={handleGetReviewList}
                />
                <ReviewPostModal
                  show={showReviewModal}
                  onClose={handleReviewModal}
                  lectureList={canReviewLectures}
                  userId={userId}
                  classId={classId}
                  onUpdate={() => {
                    handleReviewUpdate;
                  }}
                />
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
