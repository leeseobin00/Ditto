import { useState } from "react";
import { styled } from "styled-components";

import OutlineButton from "../../components/common/OutlineButton";
import ClassCard from "../../components/Profile/ClassCard";
import PostList from "../../components/Profile/ProfileDetail/PostList";
import Sidebar from "../../components/Profile/SideBar";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  width: calc(100% - 200px);
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 32px;
  margin-bottom: 60px;
`;

const SectionTitle = styled.p`
  color: var(--PRIMARY);
  font-weight: 600;
  font-size: 22px;
  width: 100%;
  max-width: 1024px;
  margin-bottom: 32px;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: calc(780px + 64px);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: calc(520px + 32px);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    width: 260px;
    gap: 0px;
  }
`;

const IntroContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 16px;
  min-height: 160px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 32px;
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

  return (
    <Container>
      <Sidebar />
      <Content>
        <Section id="intro">
          <SectionTitle>소개글</SectionTitle>
          <IntroContent>
            안녕하세요, 조향과 뜨개질에 관심이 많은 김디토입니다!
            <br />
            소통해요~
          </IntroContent>
        </Section>

        <Section id="classes">
          <SectionTitle>참여 Class</SectionTitle>
          <Cards>
            <ClassCard />
            <ClassCard />
            <ClassCard />
          </Cards>
          <ButtonWrapper>
            <OutlineButton label="더보기" color="default" />
          </ButtonWrapper>
        </Section>

        <Section id="posts">
          <SectionTitle>작성한 글</SectionTitle>
          <PostList posts={posts} />
          <ButtonWrapper>
            <OutlineButton label="더보기" color="default" />
          </ButtonWrapper>
        </Section>
      </Content>
    </Container>
  );
}

export default ProfileDetailPage;
