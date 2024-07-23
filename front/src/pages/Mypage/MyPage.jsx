import React, { useState } from 'react';
import styled from 'styled-components';
import SidebarNav from '../../components/MyPage/Common/SidebarNav';
import UserInfoDetailPage from './UserInfoPage/UserInfoDetailPage';

const Container = styled.div`
  display: flex;
  margin: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('account'); // 현재 선택된 메뉴 상태

  const renderContent = () => {
    switch (selectedMenu) {
      case 'account':
        return <UserInfoDetailPage />;
      // 추가 메뉴에 따라 다른 컴포넌트를 렌더링
      // case 'otherMenu':
      //   return <OtherComponent />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <SidebarNav setSelectedMenu={setSelectedMenu} />
      <Content>
        {renderContent()}
      </Content>
    </Container>
  );
};

export default MyPage;
