import { styled } from "styled-components";

import Header from "./Header";

const LayoutContainer = styled.div`
  max-width: 1240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

function Layout({ children }) {
  return (
    <LayoutContainer>
      <Header />
      {children}
    </LayoutContainer>
  );
}

export default Layout;
