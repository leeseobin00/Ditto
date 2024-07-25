import { styled } from "styled-components";
import { BsPersonFill, BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";

import Profile from "./Profile";
import MyProfile from "./MyProfile";

import StarIcon from "../../assets/icon/class/star.png";

const SidebarWrapper = styled.nav`
  background-color: white;
  width: 240px;
  border-right: 1px solid var(--BORDER_COLOR);
`;

const LectureDetails = styled.div`
  border-top: 1px solid var(--BORDER_COLOR);
  border-bottom: 1px solid var(--BORDER_COLOR);
  margin: 8px 16px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LectureDetail = styled.div`
  display: flex;
  flex-direction: column;
  jusify-content: center;
  align-items: center;
  width: 50%;
  height: 48px;
`;

const DetailTitle = styled.div`
  color: var(--TEXT_SECONDARY);
  margin-bottom: 8px;
`;

const DetailContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: var(--TEXT_PRIMARY);
  font-weight: 500;
  font-size: 18px;
`;

const CustomPersonIcon = styled(BsPersonFill)`
  width: 18px;
  height: 18px;
  color: var(--YELLOW);
`;

const CustomStarIcon = styled(BsStarFill)`
  width: 18px;
  height: 18px;
  color: var(--YELLOW);
`;

const CustomImage = styled.img`
  width: 18px;
  height: 18px;
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

function Sidebar({ isMyProfile, studentSum, avgRating, seekerId, postHeart, deleteHeart }) {
  const roleId = useSelector(state => state.auth.roleId);

  return (
    <SidebarWrapper>
      {isMyProfile ? <MyProfile seekerId={seekerId}/> : 
      <Profile
        seekerId={seekerId}
        postHeart={postHeart} 
        deleteHeart={deleteHeart} />}
      {roleId==2 && <LectureDetails>
        <LectureDetail>
          <DetailTitle>수강생 수</DetailTitle>
          <DetailContent>
            <CustomPersonIcon />
            {(studentSum).toLocaleString()}
          </DetailContent>
        </LectureDetail>
        <LectureDetail>
          <DetailTitle>평점</DetailTitle>
          <DetailContent>
            <CustomStarIcon />
            {avgRating}
          </DetailContent>
        </LectureDetail>
      </LectureDetails>}
      <NavList>
        <NavItem>
          <NavLink href="#intro">소개글</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#classes">참여 Class</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#reviews">강의 리뷰</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#posts">작성한 글</NavLink>
        </NavItem>
      </NavList>
    </SidebarWrapper>
  );
}

export default Sidebar;
