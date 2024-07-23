import { useState } from "react";
import styled from "styled-components";

import Crown from "../../assets/icon/profile/crown.png";

const ParticipantTile = styled.div`
  background-color: var(--MEETING_PRIMARY);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  aspect-ratio: 4 / 3;
  position: relative;
  overflow: visible;

  &.active {
    border: 2px solid var(--GREEN);
  }

  &.highlighted {
    border: 2px solid var(--RED);
  }
`;

const UserIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: var(--MEETING_BAR);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserName = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const MenuButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;

const Menu = styled.div`
  position: absolute;
  top: 24px;
  right: 8px;
  background-color: var(--MEETING_BAR);
  border: 1px solid var(--MEETING_SECONDARY);
  border-radius: 4px;
  display: ${(props) => (props.open ? "block" : "none")};
  z-index: 100;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

  & > div {
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: var(--MEETING_SECONDARY);
    }
  }
`;

const MenuItem = styled.div`
  background-color: var(--MEETING_SECONDARY);
  z-index: 1;
`;

const CrownIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

function Participant({ name, imgSrc, isHelp, isHighlighted, isInstructor }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ParticipantTile
      className={`${isHelp ? "active" : ""} ${isHighlighted ? "highlighted" : ""}`}
    >
      <UserName>
        {isInstructor && <CrownIcon src={Crown} alt="Instructor" />}
        {name}
      </UserName>
      {!isInstructor && (
        <>
          <MenuButton onClick={toggleMenu}>⋮</MenuButton>
          <Menu open={isMenuOpen}>
            <MenuItem>개인세션으로 이동</MenuItem>
          </Menu>
        </>
      )}
      <UserIcon>
        <img src={imgSrc} alt={`${name} profile`} />
      </UserIcon>
    </ParticipantTile>
  );
}

export default Participant;
