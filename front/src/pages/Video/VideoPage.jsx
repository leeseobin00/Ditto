import { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { BiVideo } from "react-icons/bi";
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
    const size = 3;

    return (
        <Container>
            <PageTitle>내 강의실</PageTitle>
            <LectureList>
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
                <OutlineButton label="더보기" size="lg" color="default"/>
            </ButtonWrapper>
        </Container>
    );
}


export default VideoPage;
