import { styled } from "styled-components";

import RoundButton from "../../common/RoundButton";
import Dollar from "../../../assets/icon/class/dollar.png";
import Heart from "../../../assets/icon/common/heart/heart-secondary.png";
import HeartActivated from "../../../assets/icon/common/heart/heart-activated.png";

const ClassSideBarConatiner = styled.div`
  position: sticky;
  top: 85px;
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 250px;
  border-style: solid;
  border-width: 0.5px;
  border-radius: 10px;
  border-color: var(--BORDER_COLOR);
  padding: 15px;
  box-shadow: 1px 1px 5px #767676;
  margin-top: 25px;
  margin-left: 15px;
  justify-content: space-between;
`;

const ClassPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const ClassPrice = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: var(--PRIMARY);
`;

const SelectBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
`;

const SelectBox = styled.select`
  border-radius: 25px;
  border-color: var(--BORDER_COLOR);
  height: 40px;
  font-size: 20px;
  padding-left: 10px;
  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const LikeContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const LikeButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: transparent;
  background-image: url(${Heart});
  background-size: cover;
  margin-right: 10px;
  border-style: none;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0px 0px 2px rgb(84, 84, 84));
  }
`;

const LikeCount = styled.div`
  font-size: 18px;
  color: var(--TEXT_SECONDARY);
`;

const formatNumber = (number) => {
  return number.toLocaleString();
};

function ClassSideBar({ classInfo, lectureList }) {
  return (
    <ClassSideBarConatiner>
      <ClassPriceContainer>
        <Icon src={Dollar} />
        <ClassPrice>{formatNumber(classInfo.classPrice)}</ClassPrice>
      </ClassPriceContainer>
      <hr />
      <SelectBoxContainer>
        <SelectBox>
          <option>2022-08-10</option>
        </SelectBox>
        <RoundButton label={"구매하기"} size="lg" />
      </SelectBoxContainer>
      <LikeContainer>
        <LikeButton />
        <LikeCount>{formatNumber(classInfo.likeCount)}</LikeCount>
      </LikeContainer>
    </ClassSideBarConatiner>
  );
}

export default ClassSideBar;
