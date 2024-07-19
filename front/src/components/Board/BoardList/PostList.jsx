import { styled } from "styled-components";

import PostItem from "./PostItem";

const List = styled.div`
  background-color: pink;
  margin-top: 16px;
`;

function PostList({ posts }) {
  return (
    <List>
      {posts?.map((post, index) => (
        <PostItem
          key={index}
          postId={post?.postId}
          title={post?.title}
          likeCount={post?.likeCount}
          userName={post?.userName}
          createdDate={post?.createdDate}
          viewCount={post?.viewCount}
        />
      ))}
    </List>
  );
}

export default PostList;
