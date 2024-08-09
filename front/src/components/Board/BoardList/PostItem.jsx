import { styled } from "styled-components";
import { BsHeartFill } from "react-icons/bs";

const Item = styled.div`
  display: flex;
  padding: 16px;
  background-color: var(--LIGHT);
  border-bottom: 1px solid var(--BORDER_COLOR);
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

const CustomFilledHeartIcon = styled(BsHeartFill)`
  color: var(--ACCENT1);
  margin-right: 8px;
  font-size: 14px;
`;

const PostUser = styled(Content)`
  flex: 1;
  margin-right: 16px;

  overflow: hidden;
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

function PostItem({
  postId,
  title,
  likeCount,
  userName,
  createdDate,
  commentCount,
  viewCount,
}) {
  return (
    <Item>
      <PostId>{postId}</PostId>
      <PostTitle>{title}</PostTitle>
      <PostLike><CustomFilledHeartIcon /> {likeCount}</PostLike>
      <PostUser>{userName}</PostUser>
      <PostDate>{createdDate}</PostDate>
      <PostCommentCount>{commentCount}</PostCommentCount>
      <PostCount>{viewCount}</PostCount>
    </Item>
  );
}

export default PostItem;
