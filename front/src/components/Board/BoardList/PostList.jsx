import { styled } from "styled-components";
import { Link } from "react-router-dom";

import PostItem from "./PostItem";

const List = styled.div`
  background-color: pink;
  margin-top: 16px;
`;

function PostList({ posts }) {
  return (
    <List>
      {posts?.map((post, index) => (
        <Link key={index} to={`${post?.postId || 1}`}>
          <PostItem
            postId={post?.postId}
            title={post?.title}
            likeCount={post?.likeCount}
            userName={post?.userName}
            createdDate={post?.createdDate}
            viewCount={post?.viewCount}
          />
        </Link>
      ))}
    </List>
  );
}

export default PostList;
