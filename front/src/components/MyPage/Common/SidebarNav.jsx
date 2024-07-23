import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = styled.div`
  width: 200px;
  border-right: 1px solid var(--BORDER_COLOR);
  padding: 20px;
`;

const NavItem = styled(NavLink)`
  display: block;
  margin: 10px 0;
  cursor: pointer;
  color: var(--TEXT_PRIMARY);
  text-decoration: none;
  
  &.active {
    font-weight: bold;
    color: var(--PRIMARY);
  }

  &:hover {
    color: var(--PRIMARY_DARK);
  }
`;

const SidebarNav = () => {
  return (
    <Sidebar>
      <NavItem to="account">계정 정보</NavItem>
      <NavItem to="payments">결제 내역</NavItem>
      <NavItem to="queries">작성한 문의</NavItem>
      <NavItem to="reviews">작성한 리뷰</NavItem>
      <NavItem to="wishlist">관심 목록</NavItem>
    </Sidebar>
  );
};

export default SidebarNav;
