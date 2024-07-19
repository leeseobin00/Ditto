import { styled } from "styled-components";

import PostItem from "./PostItem";

const PostListWrapper = styled.div`
  background-color: pink;
  width: 100%;
  max-width: calc(780px + 64px);
`;

function PostList({ posts }) {
  return (
    <PostListWrapper>
      {posts.map((post) => (
        <PostItem
          key={post?.postId}
          title={post?.title}
          likeCount={post?.likeCount}
          userName={post?.userName}
          createdDate={post?.createdDate}
        />
      ))}
    </PostListWrapper>
  );
}

export default PostList;
