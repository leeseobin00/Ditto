// src/components/common/Header.js
import { useState } from "react";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BiVideo, BiBell, BiLogOut, BiMenu } from "react-icons/bi";

import useAxios from "../../hooks/useAxios";

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
  min-width: 240px;
  display: flex;
  flex-direction: center;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

const CustomMenuIcon = styled(BiMenu)`
  display: flex;
  font-size: 18px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover {
    color: var(--PRIMARY);
  }
`;

const CustomVideoIcon = styled(BiVideo)`
  font-size: 18px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover {
    color: var(--PRIMARY);
  }
`;

const CustomBellIcon = styled(BiBell)`
  font-size: 18px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover {
    color: var(--PRIMARY);
  }
`;

const CustomLogoutIcon = styled(BiLogOut)`
  font-size: 18px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover {
    color: var(--PRIMARY);
  }
`;

const Icon = styled.div`
  font-size: 16px;
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
  width: 200px;
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
  const { response: getResponse, sendRequest: getPost } = useAxios();

  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // 추가된 부분
  const nickname = useSelector((state) => state.auth.nickname); // 추가된 부분
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      //await axios.post('/auth/logout'); // 로그아웃 API 요청
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <HeaderContainer>
      <Overlay open={menuOpen} onClick={handleOverlayClick} />
      <TopSection>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          <CustomMenuIcon />
        </MenuButton>
        <MobileDropdownMenu open={menuOpen}>
          <DropdownItem to="/">홈</DropdownItem>
          <DropdownItem to="/classes">카테고리</DropdownItem>
          <DropdownItem to="/board/all">커뮤니티</DropdownItem>
          <DropdownItem to="/profile/search">프로필 찾기</DropdownItem>
          <DropdownItem to={`/profile/${userId}`}>내 프로필</DropdownItem>
          <DropdownItem to="/profile/my">로그아웃</DropdownItem>
        </MobileDropdownMenu>
        <Link to="/">
          <Logo>Ditto</Logo>
        </Link>
        <Icons>
          <Link to="/video">
            <CustomVideoIcon />
          </Link>
          <CustomBellIcon />
          {isAuthenticated ? (
            <Link to="/mypage/userinfo">
              <Icon>MyPage</Icon>
            </Link>
          ) : (
            <Link to="/signup">
              <Icon>회원가입</Icon>
            </Link>
          )}
          {isAuthenticated ? (
            <Icon>{nickname}</Icon>
          ) : (
            <Link to="/login">
              <Icon>로그인</Icon>
            </Link>
          )}
          {isAuthenticated && <CustomLogoutIcon onClick={handleLogout} />}
        </Icons>
      </TopSection>
      <BottomSection>
        <Link to="/">
          <MenuItem>홈</MenuItem>
        </Link>
        <Link to="/classes">
          <MenuItem>카테고리</MenuItem>
        </Link>
        <Link to="/board/all">
          <MenuItem>커뮤니티</MenuItem>
        </Link>
        <MenuItem>
          프로필
          <DropdownMenu>
            <DropdownItem to="/profile/search">프로필 찾기</DropdownItem>
            <DropdownItem to={`/profile/${userId}`}>내 프로필</DropdownItem>
          </DropdownMenu>
        </MenuItem>
      </BottomSection>
    </HeaderContainer>
  );
};

export default Header;
