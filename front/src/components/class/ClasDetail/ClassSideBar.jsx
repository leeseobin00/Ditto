import { styled } from "styled-components";

import Dollar from "../../../assets/icon/class/dollar.png";
import Heart from "../../../assets/icon/common/heart/heart.png";
import HeartActivated from "../../../assets/icon/common/heart/heart-activated.png";

const ClassSideBarConatiner = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 300px;
  border-style: solid;
  border-width: 0.5px;
  border-radius: 10px;
  border-color: var(--BORDER_COLOR);
  padding: 15px;
  box-shadow: 1px 1px 5px #767676;
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
`;

const SelectBox = styled.select`
  color: var(--BORDER_);
  border-radius: 25px;
  height: 40px;
  font-size: 25px;
`;

const Button = styled.button`
  background-color: var(--SECONDARY);
  border-radius: 20px;
  border-style: none;
  height: 40px;
  color: var(--LIGHT);
  font-weight: 600;
  font-size: 20px;
`;

const LikeContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const LikeCount = styled.div`
  font-size: 18px;
`;

const formatNumber = (number) => {
  return number.toLocaleString();
};

function ClassSideBar({ classInfo, lectureList }) {
  return (
    <ClassSideBarConatiner>
      <ClassPriceContainer>
        <Icon src={Dollar} />
        <ClassPrice>{classInfo.classPrice}</ClassPrice>
      </ClassPriceContainer>
      <hr />
      <SelectBoxContainer>
        <SelectBox>
          <option>2022-08-10</option>
        </SelectBox>
        <Button>구매하기</Button>
      </SelectBoxContainer>
      <LikeContainer>
        <Icon src={Heart} />
        <LikeCount>{formatNumber(classInfo.likeCount)}</LikeCount>
      </LikeContainer>
    </ClassSideBarConatiner>
  );
}

export default ClassSideBar;
