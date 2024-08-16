import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Heart from "../../../assets/icon/common/heart/heart-activated.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
`;

const UserContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: left;
  width: 100%;
`;

const UserCard = styled.div`
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 10px;
  padding: 20px;
  height: 220px;
  text-align: center;
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px;
  font-size: 40px;
  object-fit: cover;
  cursor: pointer;
`;

const UserName = styled.div`
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  margin-bottom: 5px;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Tag = styled.div`
  color: var(--SECONDARY);
  border: 1px solid var(--SECONDARY);
  border-radius: 10px;
  padding: 5px;
  margin: 3px;
  font-size: 13px;
`;

const HeartIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-left: 7px;
`;

const LikedUsers = ({ users }) => {
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Container>
      <UserContainer>
        {users.map((user) => (
          <UserCard key={user.userId}>
            <ColumnContainer>
              <UserImage
                src={`http://i11a106.p.ssafy.io:8080/files/download/${user.fileId}`}
                alt={user.nickname}
                onClick={() => handleUserClick(user.userId)}
              />
              <UserName onClick={() => handleUserClick(user.userId)}>
                {user.nickname} <HeartIcon src={Heart} />
              </UserName>
            </ColumnContainer>
            <TagContainer>
              {user.tags.map((tag) => (
                <Tag key={tag.tagId}>{tag.tagName}</Tag>
              ))}
            </TagContainer>
          </UserCard>
        ))}
      </UserContainer>
    </Container>
  );
};

export default LikedUsers;
