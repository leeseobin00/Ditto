import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";

const Tabs = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  padding: 12px 24px;
  border-bottom: ${(props) =>
    props.$active ? "2px solid var(--SECONDARY)" : "none"};
  background-color: ${(props) =>
    props.$active ? "var(--LIGHT)" : "var(--BACKGROUND_COLOR);"};
  white-space: nowrap;
`;

function TabBar() {
  const location = useLocation();
  const pathArr = location.pathname.split("/");
  const path = pathArr.length === 3 ? pathArr[2] : "";

  return (
    <Tabs>
      <Link to="/classes">
        <Tab $active={path === ""}>전체</Tab>
      </Link>
      <Link to="/classes/living">
        <Tab $active={path === "living"}>리빙</Tab>
      </Link>
      <Link to="/classes/fabric">
        <Tab $active={path === "fabric"}>패브릭</Tab>
      </Link>
      <Link to="/classes/food">
        <Tab $active={path === "food"}>푸드</Tab>
      </Link>
      <Link to="/classes/art">
        <Tab $active={path === "art"}>아트</Tab>
      </Link>
    </Tabs>
  );
}

export default TabBar;
