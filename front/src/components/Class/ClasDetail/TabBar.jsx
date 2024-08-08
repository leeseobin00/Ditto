import React, { useEffect, useState } from "react";
import { Link, Events, scrollSpy } from "react-scroll";
import { styled } from "styled-components";

const TabBarContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--LIGHT);
  position: sticky;
  top: -1px;
  z-index: 3;
  background-color: white;
`;

const Button = styled.button`
  font-size: 16px;
  color: ${(props) => (props.active ? "var(--PRIMARY)" : "var(--DARK)")};
  border: none;
  cursor: pointer;
  background: none;
  &:hover {
    color: var(--PRIMARY);
  }
  width: 110px;
  font-weight: 600;
`;

function TabBar({ titleIds }) {
  const [activeSection, setActiveSection] = useState();

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {});

    Events.scrollEvent.register("end", function () {});

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <TabBarContainer>
      <Link
        activeClass="active"
        to={titleIds[0]}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
        onSetActive={() => setActiveSection(titleIds[0])}
      >
        <Button active={activeSection === titleIds[0] ? "true" : undefined}>
          강의 소개
        </Button>
      </Link>
      <Link
        activeClass="active"
        to={titleIds[1]}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
        onSetActive={() => setActiveSection(titleIds[1])}
      >
        <Button active={activeSection === titleIds[1] ? "true" : undefined}>
          리뷰
        </Button>
      </Link>
      <Link
        activeClass="active"
        to={titleIds[2]}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
        onSetActive={() => setActiveSection(titleIds[2])}
      >
        <Button active={activeSection === titleIds[2] ? "true" : undefined}>
          Q & A
        </Button>
      </Link>
    </TabBarContainer>
  );
}

export default TabBar;
