import { useState } from "react";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";

import Sidebar from "../../components/Profile/SideBar";
import Section from "../../components/Profile/ProfileDetail/Section";
import CardList from "../../components/Profile/ProfileDetail/CardList";
import ReviewList from "../../components/Profile/ProfileDetail/ReviewList";
import PostList from "../../components/common/PostList";
import RoundButton from "../../components/common/RoundButton";

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

const ModalTitle = styled.p`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 32px;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  font-size: 16px;
  border: 1px solid lightgray;
  border-radius: 8px;
  margin-bottom: 48px;
  resize: none;
`;

const introModalContent = () => {
  return (
    <>
      <ModalTitle>소개글</ModalTitle>
      <Textarea />
      <RoundButton label="수정" />
    </>
  );
};

function ProfileDetailPage() {
  const location = useLocation();
  const isMyProfile = location.pathname === "/profile/my";

  const [posts, setPosts] = useState([
    {
      postId: 1,
      title: "제목",
      likeCount: "1024",
      userName: "김싸피",
      createdDate: "2024-07-19",
    },
    {
      postId: 2,
      title: "제목",
      likeCount: "1024",
      userName: "김싸피",
      createdDate: "2024-07-19",
    },
  ]);
  const [cards, setCards] = useState([
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

  return (
    <Container>
      <Sidebar isMyProfile={isMyProfile} />
      <Content>
        <Section
          id="intro"
          title="소개글"
          isMyProfile={isMyProfile}
          modalContent={introModalContent}
        >
          <IntroContent>
            안녕하세요, 조향과 뜨개질에 관심이 많은 김디토입니다! 소통해요~
          </IntroContent>
        </Section>

        <Section id="classes" title="참여 Class">
          <CardList cards={cards} />
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
