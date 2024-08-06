import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { BiVideo } from "react-icons/bi";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/useAxios";
import OutlineButton from "../../components/common/OutlineButton";

const Container = styled.div`
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    padding: 32px;
`;

const PageTitle = styled.p`
    color: var(--PRIMARY);
    font-weight: 600;
    font-size: 24px;
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
`
const TitleBox = styled(Box)`
    flex: 4;
`
const DateBox = styled(Box)`
    flex: 2;
`
const IconBox = styled(Box)`
    flex: 1;
`

const Image = styled.img`
    width: 120px;
    height: 120px;
    border: 1px solid var(--BORDER_COLOR);
    border-radius: 100%;
    background-color: var(--BACKGROUND_COLOR);
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
    const userId = useSelector((state)=>state.auth.userId);
    const roleId = useSelector((state)=>state.auth.roleId);
    const { sendRequest } = useAxios();
    const [lectures, setLectures] = useState([{
        id: 1,
        title: "누구나 손쉽게 따라하는 피아노 입문 클래스",
        time: "2024-07-11 8:00" 
    },
    {
        id: 1,
        title: "누구나 손쉽게 따라하는 피아노 입문 클래스",
        time: "2024-07-11 8:00" 
    },
    {
        id: 1,
        title: "누구나 손쉽게 따라하는 피아노 입문 클래스",
        time: "2024-07-11 8:00" 
    }]);
    const [curPage, setCurPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const getLecture = async() => {
        if(roleId==1){ // 수강생이면
            const result = await sendRequest(`/learning/student/${userId}?page=${curPage}`, null, "get");
            setLectures(result?.data?.learnings);
            setTotalPage(result?.data?.totalPageCount);
        }else if(roleId==2){ // 강사이면
            const result = await sendRequest(`/learning/teacher/${userId}?page=${curPage}`, null, "get");
            setLectures(result?.data?.learnings);
            setTotalPage(result?.data?.totalPageCount);
        }
    }

    const getNextLecture = async() => {
        if(curPage>=totalPage) return;

        if(roleId==1){ // 수강생이면
            const result = await sendRequest(`/learning/student/${userId}?page=${curPage+1}`, null, "get");
            setLectures((prev)=>[...prev, ...result?.data?.learnings]);
            setTotalPage(result?.data?.totalPageCount);
        }else if(roleId==2){ // 강사이면
            const result = await sendRequest(`/learning/teacher/${userId}?page=${curPage+1}`, null, "get");
            setLectures((prev)=>[...prev, ...result?.data?.learnings]);
            setTotalPage(result?.data?.totalPageCount);
        }
        setCurPage((prev)=>prev+1);
    }

    useEffect(()=>{
        if(roleId && userId){
            getLecture();
        }
    },[roleId, userId]);

    return (
        <Container>
            <PageTitle>내 강의실</PageTitle>
            <LectureList>
                {lectures.length===0 && "예정된 강의가 없습니다."}
                {lectures.map((lecture, index) => (
                    <Lecture key={index}>
                        <ImageBox><Image /></ImageBox>
                        <TitleBox>{lecture?.title}</TitleBox>
                        <DateBox>{lecture?.time}</DateBox>
                        <IconBox>
                            <Link to="/meeting">
                                <CustomVideoIcon />
                            </Link>
                        </IconBox>
                    </Lecture>
                ))}
            </LectureList>
            <ButtonWrapper>
                {(curPage<totalPage) && <OutlineButton label="더보기" size="lg" color="default" onClick={getNextLecture} />}
            </ButtonWrapper>
        </Container>
    );
}


export default VideoPage;
