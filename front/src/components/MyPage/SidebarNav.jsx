// src/components/MyPage/SidebarNav.jsx
import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
  width: 200px;
  border-right: 1px solid var(--BORDER_COLOR);
  padding: 20px;
`;

const Title = styled.h2`
  color: var(--PRIMARY);
  margin-bottom: 20px;
`;

const NavItem = styled.div`
  margin: 10px 0;
  cursor: pointer;
  color: var(--TEXT_PRIMARY);
  &:hover {
    color: var(--PRIMARY_DARK);
  }
`;

const SidebarNav = () => {
  return (
    <Sidebar>
      <NavItem>계정 정보</NavItem>
      <NavItem>결제 내역</NavItem>
      <NavItem>작성한 문의</NavItem>
      <NavItem>작성한 리뷰</NavItem>
      <NavItem>관심 목록</NavItem>
    </Sidebar>
  );
};

export default SidebarNav;
