import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../../components/Profile/SideBar";
import Section from "../../components/Profile/ProfileDetail/Section";
import CardList from "../../components/Profile/ProfileDetail/CardList";
import ReviewList from "../../components/Profile/ProfileDetail/ReviewList";
import PostList from "../../components/common/PostList";
import ModifyIntro from "../../components/Profile/ProfileDetail/ModifyIntro";
import useAxios from "../../hooks/useAxios";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  width: calc(100% - 240px);
`;

const IntroContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 16px;
  min-height: 160px;
  text-align: center;
`;

function ProfileDetailPage() {
  // router
  const loginUserId = useSelector(state => state.auth.userId);
  const { userId } = useParams();
  const location = useLocation();
  const isMyProfile = location.pathname === "/profile/my";
  const navigate = useNavigate();
  useEffect(()=>{
    if(loginUserId===userId){
      navigate("/profile/my");
    }
  },[]);
  // axios
  const { sendRequest: getProfile} = useAxios();
  const { sendRequest: getClass} = useAxios();
  const { sendRequest: getPost} = useAxios();

  const { sendRequest: getHeart } = useAxios();
  const { sendRequest: postHeart} = useAxios();
  const { sendRequest: deleteHeart } = useAxios();

  // state
  const [heartStatus, setHeartStatus] = useState(false);

  const [classes, setClasses] = useState([
    {
      title: "제목",
      name: "김싸피",
      date: "2024-07-19",
      tag: "향수",
    },
    {
      title: "제목2",
      name: "김디토",
      date: "2024-07-19",
      tag: "뜨개질",
    },
  ]);
  const [reviews, setReviews] = useState([
    { rating: 4 },
    { rating: 3 },
    { rating: 5 },
  ]);
  
  const [posts, setPosts] = useState([]);

  const handleGetProfile = async() => {
    const result = await getProfile(`/profiles/${loginUserId}`, null, "get");
    console.log(result);
  }

  const handleGetClass = async() => {
    const result = await getClass(`/profiles/${loginUserId}/class`, null, "get");
    if(result){
      setClasses(result?.data);
    }
    console.log(result);
  }

  const handleGetPost = async() => {
    const result = await getPost(`/profiles/${loginUserId}/post`, null, "get");
    setPosts(result?.data?.posts);
    console.log(result)
  }

  const handleGetHeart = async() => {
    const result = await getHeart(`/profiles/${loginUserId}/like?seekerId=${userId}`,null, "get");
    setHeartStatus(result?.data);
    console.log(result?.data);
  }

  const handlePostHeart = async() => {
    console.log("===============>postHeart");
    await postHeart(`/profiles/${loginUserId}/like?seekerId=${userId}`, null, "post");
  }

  const handleDeleteHeart = async() => {
    await deleteHeart(`/profiles/${loginUserId}/like?seekerId=${userId}`, null, "delete");
  }

  useEffect(()=>{
    if(loginUserId){
      handleGetPost();
      handleGetClass();
      handleGetProfile();
      handleGetHeart();
    }
  },[loginUserId]);

  return (
    <Container>
      <Sidebar 
        isMyProfile={isMyProfile}
        heartStatus={heartStatus}
        postHeart={handlePostHeart}
        deleteHeart={handleDeleteHeart}
      />
      <Content>
        <Section
          id="intro"
          title="소개글"
          isMyProfile={isMyProfile}
          modalContent={ModifyIntro}
        >
          <IntroContent>
            안녕하세요, 조향과 뜨개질에 관심이 많은 김디토입니다! 소통해요~
          </IntroContent>
        </Section>

        <Section id="classes" title="참여 Class">
          <CardList cards={classes} />
        </Section>

        <Section id="reviews" title="강의 리뷰">
          <ReviewList reviews={reviews} />
        </Section>

        <Section id="posts" title="작성한 글">
          <PostList posts={posts} />
        </Section>
      </Content>
    </Container>
  );
}

export default ProfileDetailPage;
