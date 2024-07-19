import { useState } from "react";
import { styled } from "styled-components";
import { BsChevronLeft, BsHeart, BsHeartFill } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Button from "../../common/Button";
import OutlineButton from "../../common/OutlineButton";
import Modal from "../../common/Modal";

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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 48px;
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
  const location = useLocation();
  const path = location.pathname.split("/");
  const { postId } = useParams(); // 게시글 ID를 URL 파라미터로 가져옴
  const navigate = useNavigate();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleEdit = () => {
    navigate(`/board/edit/${postId}`);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // 추후 삭제 api 연결
    setIsModalOpen(false);
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
        <Link to={`/${path[1]}/${path[2]}`}>
          <ButtonWrapper>
            <OutlineButton
              label={<CustomBackIcon />}
              color="default"
              size="sm"
            />
          </ButtonWrapper>
        </Link>
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

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ModalContent style={{ textAlign: "center" }}>
            <p>게시글을 삭제하시겠습니까?</p>
            <ModalButtons>
              <OutlineButton
                label="삭제"
                color="ACCENT1"
                onClick={handleConfirmDelete}
              />
              <Button label="취소" color="default" onClick={handleCloseModal} />
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </PostWrapper>
  );
}

export default Post;
