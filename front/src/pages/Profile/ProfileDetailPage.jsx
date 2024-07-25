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
  const roleId = useSelector(state => state.auth.roleId);

  const { userId } = useParams();
  const [isMyProfile, setIsMyProfile] = useState(false);
  useEffect(()=>{
    if(loginUserId===userId){
      setIsMyProfile(true);
    }
  },[]);
  
  // axios
  const { sendRequest: getProfile} = useAxios();
  const { sendRequest: getClasses} = useAxios();
  const { sendRequest: getPosts} = useAxios();

  const { sendRequest: postHeart} = useAxios();
  const { sendRequest: deleteHeart } = useAxios();

  const { sendRequest: getReviews } = useAxios();
  const { sendRequest: getRating } = useAxios();

  // state
  const [classes, setClasses] = useState([]);
  const [reviews, setReviews] = useState([
    { rating: 4 },
    { rating: 3 },
    { rating: 5 },
  ]);
  const [posts, setPosts] = useState([]);
  const [studentSum, setStudentSum] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  const handleGetProfile = async() => {
    const result = await getProfile(`/profiles/${userId}`, null, "get");

  }

  const handleGetClasses = async() => {
    const result = await getClasses(`/profiles/${userId}/class`, null, "get");
    if(result){
      setClasses(result?.data);
    }
  }

  const handleGetPosts = async() => {
    const result = await getPosts(`/profiles/${userId}/post`, null, "get");
    setPosts(result?.data?.posts);
  }

  const handlePostHeart = async() => {
    await postHeart(`/profiles/${loginUserId}/like?seekerId=${userId}`, null, "post");
  }

  const handleDeleteHeart = async() => {
    await deleteHeart(`/profiles/${loginUserId}/like?seekerId=${userId}`, null, "delete");
  }

  const handleGetReviews = async() => {
    const result = await getReviews(`/profiles/${userId}/review`, null, "get");
    if(result){
      setReviews(result?.data);
    }
  }

  const handleRating = async() => {
    const result = await getRating(`/profiles/${userId}`)
    if(result){
      setStudentSum(result?.data?.studentSum);
      setAvgRating(result?.data?.avgRating);
    }
  }

  useEffect(()=>{
    if(loginUserId){
      handleGetProfile();
      handleGetClasses();
      handleGetPosts();
      //강사일때만
      if(roleId==2){
        handleGetReviews();
        handleRating();
      }
    }
  },[loginUserId]);

  return (
    <Container>
      <Sidebar 
        isMyProfile={isMyProfile}
        studentSum={studentSum}
        avgRating={avgRating}
        seekerId={userId}
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

        {roleId==2 && <Section id="reviews" title="강의 리뷰">
          <ReviewList reviews={reviews} />
        </Section>}

        <Section id="posts" title="작성한 글">
          <PostList posts={posts} />
        </Section>
      </Content>
    </Container>
  );
}

export default ProfileDetailPage;
