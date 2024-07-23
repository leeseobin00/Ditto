import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
  width: 200px;
  border-right: 1px solid var(--BORDER_COLOR);
  padding: 20px;
`;

const NavItem = styled.div`
  margin: 10px 0;
  cursor: pointer;
  color: var(--TEXT_PRIMARY);
  &:hover {
    color: var(--PRIMARY_DARK);
  }
`;

const SidebarNav = ({ setSelectedMenu }) => {
  return (
    <Sidebar>
      <NavItem onClick={() => setSelectedMenu('account')}>계정 정보</NavItem>
      <NavItem onClick={() => setSelectedMenu('payments')}>결제 내역</NavItem>
      <NavItem onClick={() => setSelectedMenu('queries')}>작성한 문의</NavItem>
      <NavItem onClick={() => setSelectedMenu('reviews')}>작성한 리뷰</NavItem>
      <NavItem onClick={() => setSelectedMenu('wishlist')}>관심 목록</NavItem>
    </Sidebar>
  );
};

export default SidebarNav;
