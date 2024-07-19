import { styled } from "styled-components";

const Item = styled.div`
  display: flex;
  padding: 16px;
  background-color: var(--LIGHT);
  border-bottom: 1px solid var(--BORDER_COLOR);
`;

const Content = styled.p`
  font-size: 16px;
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
`;

const PostLike = styled(Content)`
  flex: 1;
  margin-right: 16px;
`;

const PostUser = styled(Content)`
  flex: 1;
  margin-right: 16px;
`;

const PostDate = styled(Content)`
  flex: 1;
  margin-right: 16px;
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
  viewCount,
}) {
  return (
    <Item>
      <PostId>{postId}</PostId>
      <PostTitle>{title}</PostTitle>
      <PostLike>{likeCount}</PostLike>
      <PostUser>{userName}</PostUser>
      <PostDate>{createdDate}</PostDate>
      <PostCount>{viewCount}</PostCount>
    </Item>
  );
}

export default PostItem;
