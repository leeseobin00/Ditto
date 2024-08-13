import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const Sidebar = styled.div`
  min-width: 240px;
  border-right: 1px solid var(--BORDER_COLOR);
  padding-top: 20px;
  padding-left: 18px;
  min-height: calc(100vh - 100px);
`;

const NavItem = styled(NavLink)`
  display: block;
  color: var(--TEXT_PRIMARY);
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  padding: 16px 16px;
  cursor: pointer;

  &.active {
    font-weight: bold;
    color: var(--PRIMARY);
  }

  &:hover {
    color: var(--PRIMARY);
  }
`;

const SidebarNav = ({ roleId }) => {
  return (
    <Sidebar>
      {roleId == "1" && (
        <>
          <NavItem to="userinfo">계정 정보</NavItem>
          <NavItem to="payment">결제 내역</NavItem>
          <NavItem to="question">작성한 문의</NavItem>
          <NavItem to="reviews">작성한 리뷰</NavItem>
          <NavItem to="liked">관심 목록</NavItem>
        </>
      )}
      {roleId == "2" && (
        <>
          <NavItem to="prouserinfo">계정 정보</NavItem>
          <NavItem to="mileage">마일리지 출금</NavItem>
          <NavItem to="question">문의 내역</NavItem>
        </>
      )}
    </Sidebar>
  );
};

export default SidebarNav;
