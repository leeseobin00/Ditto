import { Link } from "react-router-dom";
import { styled } from "styled-components";

import Heart from "../../assets/icon/common/heart/heart-activated.png";

const BoardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 20px;
`;

const BoardItem = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;

const Primary = styled.div`
  font-size: 16px;
  color: var(--TEXT_SECONDARY);
`;

const Title = styled(Primary)`
  font-weight: 600;
  width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LikeDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 10%;
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

const User = styled(Primary)`
  width: 10%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Hr = styled.hr`
  margin: 8px 0;
  border: 1px solid var(--BACKGROUND_COLOR);
`;

function BestBoardList({ bestPosts }) {
  return (
    <BoardListContainer>
      {bestPosts.map((post, index) => (
        <>
          <BoardItem to={`/boar/detail/${post.postId}`}>
            <Title>{post.title}</Title>
            <LikeDetail>
              <Icon src={Heart} />
              <Primary>{post.likeCount}</Primary>
            </LikeDetail>
            <User>{post.nickname}</User>
            <Primary>2024-08-01</Primary>
          </BoardItem>
          <Hr />
        </>
      ))}
    </BoardListContainer>
  );
}

export default BestBoardList;
