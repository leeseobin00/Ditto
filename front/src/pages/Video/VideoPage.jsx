import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BiVideo } from "react-icons/bi";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/useAxios";
import OutlineButton from "../../components/common/OutlineButton";
import LectureImage from "../../components/Video/LectureImage";
import Swal from "sweetalert2";

const Container = styled.div`
    max-width: 1024px;
    width: 100%;
    min-height: calc(100vh - 92px - 90px);
    margin: 0 auto;
    padding: 32px;
`;

const PageTitle = styled.p`
  color: var(--PRIMARY);
  font-weight: 700;
  font-size: 25px;
  width: 100%;
  margin-bottom: 32px;
`;

const LectureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Lecture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 2px solid var(--PRIMARY);
  border-radius: 8px;
  width: 100%;
  min-width: 400px;
  height: 180px;
  max-width: 960px;
  padding: 16px 32px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ImageBox = styled(Box)`
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;
const TitleBox = styled(Box)`
  flex: 4;
`;
const DateBox = styled(Box)`
  flex: 1;
`;

const TimeBox = styled(Box)`
  flex: 1;
`;

const IconBox = styled(Box)`
  flex: 1;
`;

const VideoNull = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
  padding: 40px;
  text-align: center;
`;

const CustomVideoIcon = styled(BiVideo)`
  font-size: 32px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover {
    color: var(--PRIMARY);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 64px;
`;

function VideoPage() {
  const userId = useSelector((state) => state.auth.userId);
  const roleId = useSelector((state) => state.auth.roleId);
  const { sendRequest } = useAxios();
  const [lectures, setLectures] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId == null) {
      Swal.fire({
        title: "권한 없음",
        text: "로그인 후 이용해주세요.",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#FF7F50",
      });
      navigate("/");
    }
  });

  const getLecture = async () => {
    if (roleId == 1) {
      // 수강생이면
      const result = await sendRequest(
        `/learning/student/${userId}?page=${curPage}`,
        null,
        "get"
      );
      setLectures(result?.data?.learnings);
      setTotalPage(result?.data?.totalPageCount);
    } else if (roleId == 2) {
      // 강사이면
      const result = await sendRequest(
        `/learning/teacher/${userId}?page=${curPage}`,
        null,
        "get"
      );
      setLectures(result?.data?.learnings);
      setTotalPage(result?.data?.totalPageCount);
    }
  };

  const getNextLecture = async () => {
    if (curPage >= totalPage) return;

    if (roleId == 1) {
      // 수강생이면
      const result = await sendRequest(
        `/learning/student/${userId}?page=${curPage + 1}`,
        null,
        "get"
      );
      setLectures((prev) => [...prev, ...result?.data?.learnings]);
      setTotalPage(result?.data?.totalPageCount);
    } else if (roleId == 2) {
      // 강사이면
      const result = await sendRequest(
        `/learning/teacher/${userId}?page=${curPage + 1}`,
        null,
        "get"
      );
      setLectures((prev) => [...prev, ...result?.data?.learnings]);
      setTotalPage(result?.data?.totalPageCount);
    }
    setCurPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (roleId && userId) {
      getLecture();
    }
  }, [roleId, userId]);

  return (
    <Container>
      <PageTitle>내 강의실</PageTitle>
      <LectureList>
        {lectures.length === 0 && (
          <VideoNull>예정된 강의가 없습니다.</VideoNull>
        )}
        {lectures.map((lecture, index) => (
          <Lecture key={index}>
            <ImageBox>
              <LectureImage fileId={lecture?.file?.fileId} />
            </ImageBox>
            <TitleBox>{lecture?.className}</TitleBox>
            <DateBox>
              {lecture?.year}-{lecture?.month?.toString().padStart(2, "0")}-
              {lecture?.day?.toString().padStart(2, "0")}
            </DateBox>
            <TimeBox>
              {lecture?.hour?.toString().padStart(2, "0")}:
              {lecture?.minute?.toString().padStart(2, "0")}
            </TimeBox>
            <IconBox>
              <Link to={`/meeting/${lecture?.lectureId}`}>
                <CustomVideoIcon />
              </Link>
            </IconBox>
          </Lecture>
        ))}
      </LectureList>
      <ButtonWrapper>
        {curPage < totalPage && (
          <OutlineButton
            label="더보기"
            size="lg"
            color="default"
            onClick={getNextLecture}
          />
        )}
      </ButtonWrapper>
    </Container>
  );
}

export default VideoPage;
