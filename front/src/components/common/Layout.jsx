import { styled } from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

const LayoutContainer = styled.div`
  max-width: 1240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
`;

function Layout({ children }) {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;
