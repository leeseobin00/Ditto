import { useEffect, useState, createContext } from "react";
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

const IntroText = styled.div`
  font-size: 16px;
  color: var(--TEXT_SECONDARY);  
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

// Context 정의
export const ProfileContext = createContext(); // Context를 export하여 다른 파일에서 사용할 수 있도록 함

function ProfileDetailPage() {
  const userId = useSelector(state => state.auth.userId);
  const { profileId } = useParams();
  const isMyProfile = userId === profileId;

  const [profileImageURL, setProfileImageURL] = useState(undefined);
  const [profileName, setProfileName] = useState("");
  const [profileRoleId, setProfileRoleId] = useState(1);
  const [tags, setTags] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [studentSum, setStudentSum] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [intro, setIntro] = useState("");
  const [classes, setClasses] = useState([]);
  const [proClasses, setProClasses] = useState([]);
  const [classPage, setClassPage] = useState(1);
  const [totalClassPage, setTotalClassPage] = useState(1);
  const classSize = 3;
  const [reviews, setReviews] = useState([
    { rating: 4 },
    { rating: 3 },
    { rating: 5 },
  ]);
  const [reviewPage, setReviewPage] = useState(1);
  const reviewSize = 1;
  const [posts, setPosts] = useState([]);
  const [postPage, setPostPage] = useState(1);
  const [totalPostPage, setTotalPostPage] = useState(1);
  const postSize = 3;

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
      const role = result?.data?.roleId;
      setProfileName(result?.data?.nickname);
      setProfileRoleId(role);
      setTags(result?.data?.tags);
      setLikeCount(result?.data?.likeCount);
      setAvgRating(result?.data?.avgRating);
      setStudentSum(result?.data?.studentSum);
      setIntro(result?.data?.intro);

      //수강생일때만
      if(role==1){
        handleGetClasses();
      }
      //강사일때만
      if(role==2){
        handleGetReviews();
        handleRating();
        handleGetProClasses();
      }
      handleGetPosts();

      const baseURL = import.meta.env.VITE_BASE_URL;
      const fileId = result?.data?.fileId;

      const response = await axios.get(`${baseURL}/files/download/${fileId}`, {
        responseType: 'blob'
      });
      const fileBlob = response.data;
      const base64 = await toBase64(fileBlob);

      setProfileImageURL(base64);

    }
  }

  // class //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleGetClasses = async() => {
    const result = await getClasses(`/profiles/${profileId}/class?page=${classPage}&size=${classSize}`, null, "get");
    setClasses(result?.data?.classList);
  }

  const onNextClassess = async() => {
    if(classPage<totalClassPage){
      const curPage = classPage;
      setPostPage((prev)=>prev+1);
      const result = await getPosts(`/profiles/${profileId}/class?page=${curPage+1}&size=${postSize}`, null, "get");
      setClasses((prev)=>[...prev, ...result?.data?.classList]);
    }
  }

  const handleGetProClasses = async() => {
    const result = await getClasses(`/profiles/${profileId}/pro-class?page=${classPage}&size=${classSize}`, null, "get");
    setProClasses(result?.data?.classList);
  }

  const onNextProClassess = async() => {
    if(classPage<totalClassPage){
      const curPage = classPage;
      setPostPage((prev)=>prev+1);
      const result = await getPosts(`/profiles/${profileId}/pro-class?page=${curPage+1}&size=${postSize}`, null, "get");
      setClasses((prev)=>[...prev, ...result?.data?.classList]);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // reviews ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleGetReviews = async() => {
    const result = await getReviews(`/profiles/${profileId}/review?page=${reviewPage}&size=${reviewSize}`, null, "get");
    setReviews(result?.data?.data?.Content);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // posts //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleGetPosts = async() => {
    const result = await getPosts(`/profiles/${profileId}/post?page=${postPage}&size=${postSize}`, null, "get");
    setPosts(result?.data?.posts);
    setTotalPostPage(result?.data?.totalPageCount);
  }

  const onNextPosts = async() => {
    if(postPage<totalPostPage){
      const curPage = postPage;
      setPostPage((prev)=>prev+1);
      const result = await getPosts(`/profiles/${profileId}/post?page=${curPage+1}&size=${postSize}`, null, "get");
      setPosts((prev)=>[...prev, ...result?.data?.posts]);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 프로필에 하트 누르기 /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlePostHeart = async() => {
    await postHeart(`/profiles/${profileId}/like?seekerId=${userId}`, null, "post");
  }

  const handleDeleteHeart = async() => {
    await deleteHeart(`/profiles/${profileId}/like?seekerId=${userId}`, null, "delete");
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleRating = async() => {
    const result = await getRating(`/profiles/${userId}`)
    setStudentSum(result?.data?.studentSum);
    setAvgRating(result?.data?.avgRating);
  }

  useEffect(() => {
    if (profileId) {
      handleGetProfile();
    }
  }, [profileId]);

  return (
    <ProfileContext.Provider
      value={{profileImageURL,
        setProfileImageURL,
        profileName,
        setProfileName,
        tags,
        setTags,
        intro,
        setIntro,}}
    >
      <Container>
        <Sidebar profileName={profileName}>
          {isMyProfile ? 
            <MyProfile
              profileImageURL={profileImageURL}
              handleProfileImageURL={setProfileImageURL}
              tags={tags}
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
          {profileRoleId==2 && 
            <LectureDetails>
              <LectureDetail>
                <DetailTitle>수강생 수</DetailTitle>
              <DetailContent>
                <CustomPersonIcon />
                {(studentSum)?.toLocaleString()}
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
            modalContent={ModifyIntro}
          >
            <IntroContent>
              <IntroText>{intro ? intro : "현재 등록된 소개글이 없습니다."}</IntroText>
            </IntroContent>
          </Section>

          {profileRoleId==1 &&
            <Section id="classes" title="참여 Class" onClick={onNextClassess} curPage={classPage} totalPage={totalClassPage}>
              <CardList cards={classes} />
            </Section>          
          }

          {profileRoleId==2 && 
            <>
              <Section id="proClasses" title={`${profileName}'s Class`} onClick={onNextProClassess} curPage={classPage} totalPage={totalClassPage}>
                <CardList cards={proClasses} />
              </Section> 
              <Section id="reviews" title="강의 리뷰">
                <ReviewList reviews={reviews} />
              </Section>            
            </>
          }

          <Section id="posts" title="작성한 글" onClick={onNextPosts} curPage={postPage} totalPage={totalPostPage}>
            <PostList posts={posts}/>
          </Section>
        </Content>
      </Container>
    </ProfileContext.Provider>
  );
}

export default ProfileDetailPage;
