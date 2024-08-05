import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

import SidebarNav from "../../components/MyPage/Common/SidebarNav";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 10px;
`;

const MyPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const roleId = useSelector((state) => state.auth.roleId);

  return (
    <Container>
      <SidebarNav roleId={roleId} />
      <Content>
        <Outlet userId={userId} />
      </Content>
    </Container>
  );
};

export default MyPage;
