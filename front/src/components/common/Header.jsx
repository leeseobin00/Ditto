import { useState } from "react";
import { styled } from "styled-components";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BiVideo, BiBell, BiLogOut, BiMenu } from "react-icons/bi";
import Swal from "sweetalert2";

import useAxios from "../../hooks/useAxios";

const HeaderContainer = styled.header`
  width: 100%;
  border: none;
  box-shadow: 0px 8px 12px -8px rgba(0, 0, 0, 0.3);
  padding-bottom: 5px;
  z-index: 4;
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

const PageLink = styled(NavLink)`
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

  &.active {
    color: var(--PRIMARY);
  }
`;

const IconLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover {
    color: var(--PRIMARY);
  }

  &.active {
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

const Icon = styled(NavLink)`
  font-size: 16px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover {
    color: var(--PRIMARY);
  }

  &.active {
    color: var(--PRIMARY);
  }
`;

const NickName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
`;

const BottomSection = styled.nav`
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileWrapper = styled.div`
  position: relative;
  margin: auto 0;
  padding: 10px 0;
  &:hover > div {
    display: block;
  }
`;

const MenuItem = styled(NavLink)`
  position: relative;
  padding: 10px 20px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover > div {
    display: block;
  }

  &:hover {
    color: var(--PRIMARY);
  }

  &.active {
    color: var(--PRIMARY);
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 2;
  white-space: nowrap;
`;

const DropdownItem = styled(NavLink)`
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
  z-index: 1000;
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
  z-index: 4;
`;

const Header = () => {
  const { response: getResponse, sendRequest: getPost } = useAxios();

  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const nickname = useSelector((state) => state.auth.nickname);
  const userId = useSelector((state) => state.auth.userId);
  const isPro = useSelector((state) => state.auth.roleId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      Swal.fire({
        title: "로그아웃 하시겠습니까?",
        text: "로그아웃하면 다시 로그인해야 합니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF7F50",
        cancelButtonColor: "#d33",
        confirmButtonText: "로그아웃",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(logout());
          Swal.fire({
            icon: "success",
            title: "로그아웃 완료",
            text: "성공적으로 로그아웃 되었습니다.",
            confirmButtonColor: "#FF7F50",
          }).then(() => {
            navigate("/");
          });
        }
      });
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const location = useLocation();

  const communityIsActive = location.pathname.startsWith("/board");
  const profileIsActive = location.pathname.startsWith("/profile");
  const mypageIsActive = location.pathname.startsWith("/mypage");
  // NavLink 클릭 이벤트 방지 메소드
  const handlePreventClick = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <MobileDropdownMenu open={menuOpen}>
        <DropdownItem to="/">홈</DropdownItem>
        <DropdownItem to="/classes">클래스</DropdownItem>
        <DropdownItem
          to="/board/all"
          className={communityIsActive ? "active" : ""}
        >
          커뮤니티
        </DropdownItem>
        <DropdownItem to="/profile/search">프로필 찾기</DropdownItem>
        <DropdownItem to={`/profile/${userId}`}>내 프로필</DropdownItem>
        {isAuthenticated && <DropdownItem to="/profile/my">로그아웃</DropdownItem>}
      </MobileDropdownMenu>
      <HeaderContainer>
        <Overlay open={menuOpen} onClick={handleOverlayClick} />
        <TopSection>
          <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
            <CustomMenuIcon />
          </MenuButton>
          <NavLink to="/">
            <Logo>Ditto</Logo>
          </NavLink>
          <Icons>
            {isAuthenticated  && 
              <IconLink to="/video">
                <BiVideo style={{ fontSize: "20px" }} />
              </IconLink>
            }
            {/* 알림페이지 구현 후 수정 예정 */}
            {/* <IconLink to="/notification" onClick={handlePreventClick}>
              <BiBell style={{ fontSize: "20px" }} />
            </IconLink> */}
            {isAuthenticated ? (
              isPro == 2 ? (
                <Icon
                  to="/mypage/prouserinfo"
                  className={mypageIsActive ? "active" : ""}
                >
                  MyPage
                </Icon>
              ) : (
                <Icon
                  to="/mypage/userinfo"
                  className={mypageIsActive ? "active" : ""}
                >
                  MyPage
                </Icon>
              )
            ) : (
              <Icon to="/signup">회원가입</Icon>
            )}
            {isAuthenticated ? (
              <NickName>{nickname}</NickName>
            ) : (
              <Icon to="/login">로그인</Icon>
            )}
            {isAuthenticated && <CustomLogoutIcon onClick={handleLogout} />}
          </Icons>
        </TopSection>
        <BottomSection>
          <PageLink to="/">홈</PageLink>
          <PageLink to="/classes">클래스</PageLink>
          <PageLink
            to="/board/all"
            className={communityIsActive ? "active" : ""}
          >
            커뮤니티
          </PageLink>
          <ProfileWrapper>
            <MenuItem
              to="/profile"
              onClick={handlePreventClick}
              className={profileIsActive ? "active" : ""}
            >
              프로필
            </MenuItem>
            <DropdownMenu>
              <DropdownItem to="/profile/search">프로필 찾기</DropdownItem>
              <DropdownItem to={`/profile/${userId}`}>내 프로필</DropdownItem>
            </DropdownMenu>
          </ProfileWrapper>
        </BottomSection>
      </HeaderContainer>
    </>
  );
};

export default Header;
