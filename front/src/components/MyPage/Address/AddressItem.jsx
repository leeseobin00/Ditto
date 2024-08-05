import styled from "styled-components";

import OutlineButton from "../../common/OutlineButton";
import CallIcon from "../../../assets/icon/mypage/call.png";

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FullContainer = styled(LineContainer)`
  width: 100%;
  height: 140px;
  padding: 15px;
  border-style: solid;
  border-color: var(--BORDER_COLOR);
  border-radius: 10px;
  border-width: 1px;
  margin: 5px 0;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
`;

const AddressInfo = styled(ColumnContainer)`
  width: 75%;
`;

const AddressName = styled.div`
  font-size: 18px;
`;
const MediumFont = styled.div`
  font-size: 16px;
`;

const SecondaryFont = styled(MediumFont)`
  color: var(--TEXT_SECONDARY);
`;

const Icon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 10px;
`;

function AddressItem({ address, isPayment = false }) {
  return (
    <FullContainer>
      <AddressInfo>
        <LineContainer>
          <AddressName>집</AddressName>
          <MediumFont>기본 배송지</MediumFont>
        </LineContainer>
        <LineContainer>
          <SecondaryFont>06220</SecondaryFont>
          <LineContainer>
            <Icon src={CallIcon} alt="call-icon" />
            <SecondaryFont>010-1234-5678</SecondaryFont>
          </LineContainer>
        </LineContainer>
        <LineContainer>
          <SecondaryFont>
            서울특별시 강남구 테헤란로 212&nbsp;801호
          </SecondaryFont>
          <SecondaryFont>김디토</SecondaryFont>
        </LineContainer>
      </AddressInfo>

      <ColumnContainer>
        <OutlineButton label={"수정"} size={"sm"} />
        <OutlineButton label={"삭제"} size={"sm"} color={"ACCENT1"} />
      </ColumnContainer>
    </FullContainer>
  );
}

export default AddressItem;
