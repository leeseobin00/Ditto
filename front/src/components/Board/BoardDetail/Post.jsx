import { useState } from "react";
import { styled } from "styled-components";
import { BsChevronLeft, BsHeart, BsHeartFill } from "react-icons/bs";
import { MdMenu } from "react-icons/md";

import OutlineButton from "../../common/OutlineButton";

const PostWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.p`
  font-size: 22px;
  font-weight: 700;
`;

const Info = styled.p`
  font-size: 16px;
  color: var(--TEXT_SECONDARY);
`;

const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 8px;
`;

const SubInfo = styled.p`
  font-size: 16px;
  color: var(--TEXT_TERTIARY);
`;

const Hr = styled.hr`
  margin: 8px 0px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 16px;
`;

const Content = styled.div`
  margin-top: 16px;
`;

function HTMLContent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-center;
  margin-top: 32px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
`;

const CustomBackIcon = styled(BsChevronLeft)`
  color: var(--TEXT_SECONDARY);
`;

const CustomHeartIcon = styled(BsHeart)`
  color: var(--TEXT_SECONDARY);
`;

const CustomFilledHeartIcon = styled(BsHeartFill)`
  color: var(--ACCENT1);
`;

const CustomMenuIcon = styled(MdMenu)`
  color: var(--TEXT_SECONDARY);
  cursor: pointer;

  &:hover {
    color: var(--SECONDARY);
  }
`;

const MenuIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  position: relative;

  &:hover .dropdown-menu {
    display: block;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background-color: var(--LIGHT);
  border: 1px solid var(--SECONDARY);
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 10;
  display: none;
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: var(--BACKGROUND_COLOR);
    color: var(--SECONDARY);
  }
`;

const HeartCount = styled.p`
  margin-left: 8px;
  color: var(--TEXT_SECONDARY);
`;

const Tag = styled.div`
  border: 1px solid var(--SECONDARY);
  border-radius: 25px;
  padding: 4px 12px;
  font-weight: 600;
  color: var(--SECONDARY);
  background-color: var(--LIGHT);
  white-space: nowrap;
`;

function Post({
  title,
  username,
  createdDate,
  viewCount,
  fileName,
  fileUrl,
  content,
}) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleEdit = () => {
    // Handle edit action
  };

  const handleDelete = () => {
    // Handle delete action
  };

  return (
    <PostWrapper>
      <Header>
        <Title>{title}</Title>
        <Info>{username}</Info>
      </Header>
      <SubHeader>
        <SubInfo>{createdDate}</SubInfo>
        <SubInfo>조회수 {viewCount}</SubInfo>
      </SubHeader>
      <Hr />
      <MenuIconWrapper>
        <CustomMenuIcon size={24} />
        <DropdownMenu className="dropdown-menu">
          <DropdownItem onClick={handleEdit}>수정</DropdownItem>
          <DropdownItem onClick={handleDelete}>삭제</DropdownItem>
        </DropdownMenu>
      </MenuIconWrapper>
      <SubInfo>첨부파일 {fileName}</SubInfo>
      <Image src={fileUrl} alt={fileName} />
      <Content>
        <HTMLContent html={content} />
      </Content>
      <Buttons>
        <ButtonWrapper>
          <OutlineButton label={<CustomBackIcon />} color="default" size="sm" />
        </ButtonWrapper>
        <ButtonWrapper onClick={handleHeartClick}>
          <OutlineButton
            label={
              <>
                {isHeartFilled ? (
                  <CustomFilledHeartIcon />
                ) : (
                  <CustomHeartIcon />
                )}
                <HeartCount>123</HeartCount>
              </>
            }
            color="default"
            size="sm"
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Tag>향초</Tag>
        </ButtonWrapper>
      </Buttons>
    </PostWrapper>
  );
}

export default Post;
