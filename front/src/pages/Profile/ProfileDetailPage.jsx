import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPersonFill, BsStarFill } from "react-icons/bs";

import axios from "axios";
import useAxios from "../../hooks/useAxios";
import Sidebar from "../../components/Profile/SideBar";
import Profile from "../../components/Profile/Profile";
import MyProfile from "../../components/Profile/MyProfile";
import Section from "../../components/Profile/ProfileDetail/Section";
import CardList from "../../components/Profile/ProfileDetail/CardList";
import ReviewList from "../../components/Profile/ProfileDetail/ReviewList";
import PostList from "../../components/common/PostList";
import ModifyIntro from "../../components/Profile/ProfileDetail/ModifyIntro";

const Container = styled.div`
  display: flex;
`;


const LectureDetails = styled.div`
  border-top: 1px solid var(--BORDER_COLOR);
  border-bottom: 1px solid var(--BORDER_COLOR);
  margin: 8px 16px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LectureDetail = styled.div`
  display: flex;
  flex-direction: column;
  jusify-content: center;
  align-items: center;
  width: 50%;
  height: 48px;
`;

const DetailTitle = styled.div`
  color: var(--TEXT_SECONDARY);
  margin-bottom: 8px;
`;

const DetailContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: var(--TEXT_PRIMARY);
  font-weight: 500;
  font-size: 18px;
`;

const CustomPersonIcon = styled(BsPersonFill)`
  width: 18px;
  height: 18px;
  color: var(--YELLOW);
`;

const CustomStarIcon = styled(BsStarFill)`
  width: 18px;
  height: 18px;
  color: var(--YELLOW);
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
  const userId = useSelector(state => state.auth.userId);
  const roleId = useSelector(state => state.auth.roleId);
  const { profileId } = useParams();
  const isMyProfile = userId === profileId;

  const [profileImageURL, setProfileImageURL] = useState(undefined);
  const [profileName, setProfileName] = useState("");
  const [tags, setTags] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [studentSum, setStudentSum] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [intro, setIntro] = useState("");
  const [classes, setClasses] = useState([]);
  const [reviews, setReviews] = useState([
    { rating: 4 },
    { rating: 3 },
    { rating: 5 },
  ]);
  const [posts, setPosts] = useState([]);
  
  // axios
  const { sendRequest: getProfile} = useAxios();
  const { sendRequest: getClasses} = useAxios();
  const { sendRequest: getPosts} = useAxios();

  const { sendRequest: postHeart} = useAxios();
  const { sendRequest: deleteHeart } = useAxios();

  const { sendRequest: getReviews } = useAxios();
  const { sendRequest: getRating } = useAxios();

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleGetProfile = async() => {    
    const result = await getProfile(`/profiles/${profileId}`, null, "get");
    if(result){
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const fileId = result?.data?.fileId;

      const response = await axios.get(`${baseUrl}/files/download/${fileId}`, {
        responseType: 'blob'
      });
      const fileBlob = response.data;
      const base64 = await toBase64(fileBlob);

      setProfileImageURL(base64);
      setProfileName(result?.data?.nickname);
      setTags(result?.data?.tags);
      setLikeCount(result?.data?.likeCount);
      setAvgRating(result?.data?.avgRating);
      setStudentSum(result?.datat?.studentSum);
      setIntro(result?.data?.intro);
    }
  }

  const handleGetClasses = async() => {
    const result = await getClasses(`/profiles/${userId}/class`, null, "get");
    setClasses(result?.data);
  }

  const handleGetReviews = async() => {
    const result = await getReviews(`/profiles/${userId}/review`, null, "get");
    setReviews(result?.data);
  }

  const handleGetPosts = async() => {
    const result = await getPosts(`/profiles/${userId}/post`, null, "get");
    setPosts(result?.data?.posts);
  }

  const handlePostHeart = async() => {
    await postHeart(`/profiles/${profileId}/like?seekerId=${userId}`, null, "post");
  }

  const handleDeleteHeart = async() => {
    await deleteHeart(`/profiles/${profileId}/like?seekerId=${userId}`, null, "delete");
  }

  const handleRating = async() => {
    const result = await getRating(`/profiles/${userId}`)
    setStudentSum(result?.data?.studentSum);
      setAvgRating(result?.data?.avgRating);
  }

  useEffect(()=>{
    if(profileId){
      handleGetProfile();
      handleGetClasses();
      handleGetPosts();
      //강사일때만
      if(roleId==2){
        handleGetReviews();
        handleRating();
      }
    }
  },[profileId]);

  return (
    <Container>
      <Sidebar>
        {isMyProfile ? 
          <MyProfile
            profileImageURL={profileImageURL}
            handleProfileImageURL={setProfileImageURL}
            tags={tags}
            handleTags={setTags}
            userName={profileName}
            likeCount={likeCount}       
          /> : 
          <Profile
            profileImageURL={profileImageURL}
            userName={profileName}
            likeCount={likeCount}
            tags={tags}
            profileId={profileId}
            postHeart={handlePostHeart} 
            deleteHeart={handleDeleteHeart} />}
        {roleId==2 && 
          <LectureDetails>
            <LectureDetail>
              <DetailTitle>수강생 수</DetailTitle>
            <DetailContent>
              <CustomPersonIcon />
              {(studentSum).toLocaleString()}
            </DetailContent>
            </LectureDetail>
            <LectureDetail>
              <DetailTitle>평점</DetailTitle>
              <DetailContent>
                <CustomStarIcon />
                {avgRating}
             </DetailContent>
           </LectureDetail>
          </LectureDetails>}
      </Sidebar>
      <Content>
        <Section
          id="intro"
          title="소개글"
          isMyProfile={isMyProfile}
          curIntro={intro}
          handleIntro={setIntro}
          modalContent={ModifyIntro}
        >
          <IntroContent>
            {intro}
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
