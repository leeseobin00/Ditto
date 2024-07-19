import { useState } from "react";
import { styled } from "styled-components";

import OutlineButton from "../../components/common/OutlineButton";
import Sidebar from "../../components/Profile/SideBar";
import Section from "../../components/Profile/ProfileDetail/Section";
import CardList from "../../components/Profile/ProfileDetail/CardList";
import ReviewList from "../../components/Profile/ProfileDetail/ReviewList";
import PostList from "../../components/common/PostList";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  width: calc(100% - 200px);
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

  // const handleStarClick = (index) => {
  //   setRating(index + 1);
  // };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Section id="intro" title="소개글">
          <IntroContent>
            안녕하세요, 조향과 뜨개질에 관심이 많은 김디토입니다! 소통해요~
          </IntroContent>
        </Section>

        <Section id="classes" title="참여 Class" onClick="클릭">
          <CardList cards={cards} />
        </Section>

        <Section id="reviews" title="강의 리뷰" onClick="클릭">
          <ReviewList reviews={reviews} />
        </Section>

        <Section id="posts" title="작성한 글" onClick="클릭">
          <PostList posts={posts} />
        </Section>
      </Content>
    </Container>
  );
}

export default ProfileDetailPage;
