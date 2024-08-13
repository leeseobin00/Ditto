import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isPro = useSelector((state) => state.auth.roleId);
  const roleId = useSelector((state) => state.auth.roleId);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (roleId == 1) {
        navigate("/mypage/userinfo"); // /mypage로 이동 시 /mypage/userInfo로 리디렉션
      } else {
        navigate("/mypage/prouserinfo");
      }
    } else {
      navigate("/");
    }
  }, [isAuthenticated, isPro]);

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
