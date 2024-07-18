// src/components/common/Header.js
import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { BsCameraVideo, BsBell } from "react-icons/bs";

const HeaderContainer = styled.header`
  width: 100%;
  //border-bottom: 1px solid var(--BORDER_COLOR);
  border: none;
  box-shadow: 0px 8px 12px -8px rgba(0, 0, 0, 0.3);
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: var(--PRIMARY);
  cursor: pointer;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  gap: 16px;
`;

const Icon = styled.div`
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover {
    color: var(--PRIMARY);
  }
`;

const BottomSection = styled.nav`
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.div`
  position: relative;
  padding: 10px 20px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover {
    color: var(--PRIMARY);
  }

  &:hover > div {
    display: block;
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  white-space: nowrap;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: var(--TEXT_PRIMARY);

  &:hover {
    background-color: var(--BACKGROUND_COLOR);
    color: var(--PRIMARY);
  }
`;

const MenuButton = styled.div`
  position: relative;
  display: none;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;
  padding: 10px 20px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileDropdownMenu = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--LIGHT);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 2;
  white-space: nowrap;
`;

const Overlay = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Overlay open={menuOpen} onClick={handleOverlayClick} />
      <TopSection>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>메뉴</MenuButton>
        <MobileDropdownMenu open={menuOpen}>
          <DropdownItem to="/">홈</DropdownItem>
          <DropdownItem to="/">카테고리</DropdownItem>
          <DropdownItem to="/meeting">커뮤니티</DropdownItem>
          <DropdownItem to="/meeting">프로필 찾기</DropdownItem>
          <DropdownItem to="/meeting">내 프로필</DropdownItem>
        </MobileDropdownMenu>
        <Logo>MyLogo</Logo>
        <Icons>
          <Icon>
            <BsCameraVideo />
          </Icon>
          <Icon>
            <BsBell />
          </Icon>
          <Icon>회원가입</Icon>
          <Link to="/login">
            <Icon>로그인</Icon>
          </Link>
        </Icons>
      </TopSection>
      <BottomSection>
        <Link to="/">
          <MenuItem>홈</MenuItem>
        </Link>
        <Link to="/">
          <MenuItem>카테고리</MenuItem>
        </Link>
        <Link to="/meeting">
          <MenuItem>커뮤니티</MenuItem>
        </Link>
        <MenuItem>
          프로필
          <DropdownMenu>
            <DropdownItem to="/meeting">프로필 찾기</DropdownItem>
            <DropdownItem to="/meeting">내 프로필</DropdownItem>
          </DropdownMenu>
        </MenuItem>
      </BottomSection>
    </HeaderContainer>
  );
};

export default Header;
