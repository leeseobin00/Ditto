import { styled } from "styled-components";

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-bottom: 4px;
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  border: 1px solid black;
  width: 40px;
  height: 40px;
`;

const ProfileInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ProfileName = styled.span`
  color: var(--TEXT-PRIMARY);
`;

const ProfileDate = styled.span`
  color: var(--TEXT_TERTIARY);
`;

function Profile({ fileUrl, name, date }) {
  return (
    <ProfileWrapper>
      <ProfileImage src={fileUrl} alt="이미지" />
      <ProfileInfo>
        <ProfileName>{name}</ProfileName>
        <ProfileDate>{date}</ProfileDate>
      </ProfileInfo>
    </ProfileWrapper>
  );
}

export default Profile;
