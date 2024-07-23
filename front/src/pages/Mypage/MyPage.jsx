import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SidebarNav from '../../components/MyPage/Common/SidebarNav';

const Container = styled.div`
  display: flex;
  margin: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const MyPage = () => {
  return (
    <Container>
      <SidebarNav />
      <Content>
        <Outlet /> {/* Nested route will be rendered here */}
      </Content>
    </Container>
  );
};

export default MyPage;
