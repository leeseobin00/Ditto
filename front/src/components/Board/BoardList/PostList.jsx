import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";

import PostItem from "./PostItem";
import { useEffect, useState } from "react";

const List = styled.div`
  margin-top: 16px;
  padding: 0 20px;
`;

const Item = styled.div`
  display: flex;
  padding: 16px;
  background-color: var(--LIGHT);
  border-bottom: 1px solid var(--BORDER_COLOR);
  font-weight: 600;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: var(--TEXT_SECONDARY);
  white-space: nowrap;
`;

const PostId = styled(Content)`
  flex: 1;
  margin-right: 16px;
`;

const PostTitle = styled(Content)`
  flex: 4;
  margin-right: 16px;

  overflow: hidden;
`;

const PostLike = styled(Content)`
  flex: 1;
  margin-right: 14px;
`;


const PostUser = styled(Content)`
  flex: 1;
  margin-right: 16px;
`;

const PostDate = styled(Content)`
  flex: 1;
  margin-right: 16px;
`;

const PostCommentCount = styled(Content)`
  flex: 1;
`;

const PostCount = styled(Content)`
  flex: 1;
`;

function PostList({ posts, currentPage }) {
  const [postList, setPostList] = useState([]);
  const [curPage, setCurPage] = useState(1);

  useEffect(()=>{
    setPostList(posts);
  },[posts]);

  useEffect(()=>{
    setCurPage(currentPage);
  },[currentPage]);

  return (
    <List>
      <Item>
        <PostId>No.</PostId>
        <PostTitle>제목</PostTitle>
        <PostLike>좋아요수</PostLike>
        <PostUser>작성자</PostUser>
        <PostDate>작성일</PostDate>
        <PostCommentCount>댓글수</PostCommentCount>
        <PostCount>조회수</PostCount>
      </Item>
      {postList?.map((post, index) => (
        <Link key={index} to={`/board/detail/${post?.postId || 1}`}>
          <PostItem
            postId={(curPage-1)*10+index+1}
            title={post?.title}
            likeCount={post?.likeCount}
            userName={post?.nickname}
            createdDate={post?.createdDate.split('T')[0]}
            commentCount={post?.commentCount}
            viewCount={post?.viewCount}
          />
        </Link>
      ))}
    </List>
  );
}

export default PostList;
