import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useContext } from "react";
import { MeetingContext } from "../../pages/Meeting/MeetingPage";
import { useSelector } from "react-redux";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: var(--MEETING_SECONDARY);
  padding: 24px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--SECONDARY);
  font-size: 18px;
`;

const LiveIndicator = styled.p`
  background-color: var(--RED);
  color: var(--LIGHT);
  padding: 4px 8px;
  margin-left: 16px;
  border-radius: 4px;
  font-size: 12px;
`;

const IconWrapper = styled.div`
`;

const CustomOutIcon = styled(BiLogOut)`
  font-size: 24px;
  font-weight: 600;
  color: var(--LIGHT);
  cursor: pointer;
`;

function MeetingHeader({ title }) {
  const { sendEnd } = useContext(MeetingContext);
  const roleId = useSelector((state)=>state.auth.roleId);
  const username = useSelector((state)=>state.auth.username);

  const navigate = useNavigate();

  const goBack = () => {
    if(roleId==1){
      navigate("/video");
    }else if(roleId==2){
      sendEnd(username);
    }
  }

  return (
    <Header>
      <TitleWrapper>
        {title}
        <LiveIndicator>● LIVE</LiveIndicator>
      </TitleWrapper>
      <IconWrapper onClick={goBack}>
        <CustomOutIcon />
      </IconWrapper>
    </Header>
  );
}

export default MeetingHeader;
