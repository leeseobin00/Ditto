import { styled } from "styled-components";
import { useSelector } from "react-redux";

const SidebarWrapper = styled.nav`
  background-color: white;
  width: 240px;
  border-right: 1px solid var(--BORDER_COLOR);
`;

const NavList = styled.ul`
  list-style-type: none;
`;

const NavItem = styled.li`
  padding: 16px 16px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--TEXT_PRIMARY);
  font-weight: 600;
  font-size: 16px;

  &:hover {
    color: var(--PRIMARY);
  }
`;

function Sidebar({ children }) {
  const roleId = useSelector((state)=>state.auth.roleId);

  return (
    <SidebarWrapper>
      {children}
      <NavList>
        <NavItem>
          <NavLink href="#intro">소개글</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#classes">참여 Class</NavLink>
        </NavItem>
        { roleId===2 && <NavItem>
          <NavLink href="#reviews">강의 리뷰</NavLink>
        </NavItem>}
        <NavItem>
          <NavLink href="#posts">작성한 글</NavLink>
        </NavItem>
      </NavList>
    </SidebarWrapper>
  );
}

export default Sidebar;
