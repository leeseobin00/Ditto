import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link, Events, scrollSpy } from "react-scroll";
import { styled } from "styled-components";

import { FaBars } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";

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
  z-index: 2;
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

const InstructorWrapper = styled.div`
  width: 110px;
  position: relative;
  align-self: flex-start;
  margin: auto 0;
  margin-left: auto;
  &:hover > div {
    display: block;
  }
`;

const MenuItem = styled.div`
  position: relative;
  padding: 10px 20px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover > div {
    display: block;
  }

  &:hover {
    color: var(--PRIMARY);
  }

  &.active {
    color: var(--PRIMARY);
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 40%;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 3;
  white-space: nowrap;
`;

const DropdownItem = styled.div`
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: var(--TEXT_PRIMARY);
  cursor: pointer;

  &:hover {
    background-color: var(--BACKGROUND_COLOR);
    color: var(--PRIMARY);
  }
`;

function TabBar({ classId, titleIds, isInstructor = false }) {
  const [activeSection, setActiveSection] = useState();
  const { sendRequest } = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {});

    Events.scrollEvent.register("end", function () {});

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  // 클래스 삭제
  const handleDeleteClass = async () => {
    try {
      await sendRequest(`/classes/${classId}`, null, "delete");
      navigate("/classes");
    } catch (error) {
      console.error(error);
    }
  };

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
      {isInstructor && (
        <InstructorWrapper>
          <MenuItem>
            <FaBars />
          </MenuItem>
          <DropdownMenu>
            <DropdownItem>클래스 수정</DropdownItem>
            <DropdownItem onClick={handleDeleteClass}>클래스 삭제</DropdownItem>
          </DropdownMenu>
        </InstructorWrapper>
      )}
    </TabBarContainer>
  );
}

export default TabBar;
