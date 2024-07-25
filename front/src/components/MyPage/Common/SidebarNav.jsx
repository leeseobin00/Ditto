import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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
  const { roleId } = useSelector((state) => state.auth);

  return (
    <Sidebar>
      <NavItem to="prouserinfo">계정 정보</NavItem>
          <NavItem to="mileage">마일리지 출금</NavItem>
          <NavItem to="proquestion">문의 내역</NavItem>
          <NavItem to="userinfo">계정 정보</NavItem>
          <NavItem to="payments">결제 내역</NavItem>
          <NavItem to="questions">작성한 문의</NavItem>
          <NavItem to="reviews">작성한 리뷰</NavItem>
          <NavItem to="liked">관심 목록</NavItem>
      {roleId === 2 && (
        <>
          <NavItem to="userinfo">계정 정보</NavItem>
          <NavItem to="payments">결제 내역</NavItem>
          <NavItem to="questions">작성한 문의</NavItem>
          <NavItem to="reviews">작성한 리뷰</NavItem>
          <NavItem to="liked">관심 목록</NavItem>
        </>
      )}
      {roleId === 3 && (
        <>
          <NavItem to="prouserinfo">계정 정보</NavItem>
          <NavItem to="mileage">마일리지 출금</NavItem>
          <NavItem to="proquestion">문의 내역</NavItem>
        </>
      )}
    </Sidebar>
  );
};

export default SidebarNav;
