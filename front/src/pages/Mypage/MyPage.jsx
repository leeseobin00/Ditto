import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

import SidebarNav from "../../components/MyPage/Common/SidebarNav";

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

const Content = styled.div`
  flex: 1;
`;

const MyPage = () => {
  const roleId = useSelector((state) => state.auth.roleId);

  return (
    <Container>
      <SidebarNav roleId={roleId} />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default MyPage;
