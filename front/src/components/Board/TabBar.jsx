import { styled } from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Tabs = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  padding: 12px 24px;
  background-color: ${(props) =>
    props.$active ? "var(--LIGHT)" : "var(--BACKGROUND_COLOR)"};
  border-bottom: ${(props) =>
    props.$active ? "2px solid var(--SECONDARY)" : "none"};
  white-space: nowrap;
`;

function TabBar() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  return (
    <Tabs>
      <Link to="/board/all">
        <Tab $active={path === "all"}>전체</Tab>
      </Link>
      <Link to="/board/talk">
        <Tab $active={path === "talk"}>소통해요</Tab>
      </Link>
      <Link to="/board/community">
        <Tab $active={path === "community"}>자랑해요</Tab>
      </Link>
      <Link to="/board/help">
        <Tab $active={path === "help"}>도와줘요</Tab>
      </Link>
    </Tabs>
  );
}

export default TabBar;
