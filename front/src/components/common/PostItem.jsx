import { styled } from "styled-components";
import { BsHeartFill } from "react-icons/bs";

const Item = styled.div`
  display: flex;
  padding: 16px;
  background-color: var(--LIGHT);
  border-bottom: 1px solid var(--BORDER_COLOR);
  cursor: pointer;
`;

const Content = styled.p`
  font-size: 16px;
  color: var(--TEXT_SECONDARY);
  white-space: nowrap;
`;

const PostTitle = styled(Content)`
  flex: 4;
  margin-right: 16px;
`;

const PostLike = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
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

const CustomFilledHeartIcon = styled(BsHeartFill)`
  color: var(--ACCENT1);
  margin-right: 8px;
  font-size: 14px;
`;

function PostItem({ title, likeCount, userName, createdDate }) {
  return (
    <Item>
      <PostTitle>{title}</PostTitle>
      <PostLike><CustomFilledHeartIcon /> {likeCount}</PostLike>
      <PostUser>{userName}</PostUser>
      <PostDate>{createdDate.split('T')[0]}</PostDate>
    </Item>
  );
}

export default PostItem;
