import { styled } from "styled-components";
import { Link } from "react-router-dom";

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
        <Link to={`/board/detail/${post?.postId}`} key={post?.postId}>
          <PostItem
            title={post?.title}
            likeCount={post?.likeCount}
            userName={post?.nickname}
            createdDate={post?.createdDate}
          />
        </Link>
      ))}
    </PostListWrapper>
  );
}

export default PostList;
