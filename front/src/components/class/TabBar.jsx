import { styled } from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Tabs = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  background-color: var(--BACKGROUND_COLOR);
  padding: 12px 24px;
  border-bottom: ${(props) =>
    props.$active ? "2px solid var(--SECONDARY)" : "none"};
  white-space: nowrap;
`;

function TabBar() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  return (
    <Tabs>
      <Link to="/class">
        <Tab $active={path === "all"}>전체</Tab>
      </Link>
      <Link to="/class/living">
        <Tab $active={path === "living"}>리빙</Tab>
      </Link>
      <Link to="/class/fabric">
        <Tab $active={path === "fabric"}>패브릭</Tab>
      </Link>
      <Link to="/class/food">
        <Tab $active={path === "food"}>푸드</Tab>
      </Link>
      <Link to="/class/art">
        <Tab $active={path === "art"}>아트</Tab>
      </Link>
    </Tabs>
  );
}

export default TabBar;
