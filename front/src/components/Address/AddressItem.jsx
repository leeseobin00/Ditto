import styled from "styled-components";

import useAxios from "../../hooks/useAxios";
import OutlineButton from "../common/OutlineButton";
import CallIcon from "../../assets/icon/mypage/call.png";

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FullContainer = styled(LineContainer)`
  width: 100%;
  height: 140px;
  padding: 15px 25px;
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
  width: 100%;
`;

const ButtonContainer = styled(ColumnContainer)`
  margin-left: 10%;
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

function AddressItem({ address, isPayment = false, userId, onUpdate, onEdit }) {
  const { sendRequest } = useAxios();

  const handleDeleteAddress = async () => {
    try {
      await sendRequest(
        `/mypage/${userId}/address/${address.addressId}`,
        null,
        "delete"
      );
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FullContainer>
      <AddressInfo>
        <LineContainer>
          <AddressName>{address?.addressName}</AddressName>
          {address?.isDefault && (
            <MediumFont style={{ color: "var(--GREEN)" }}>
              기본 배송지
            </MediumFont>
          )}
        </LineContainer>
        <LineContainer>
          <SecondaryFont>{address?.zipCode}</SecondaryFont>
          <LineContainer>
            <Icon src={CallIcon} alt="call-icon" />
            <SecondaryFont>{address?.phoneNumber}</SecondaryFont>
          </LineContainer>
        </LineContainer>
        <LineContainer>
          <SecondaryFont>
            {address?.address1}&nbsp;{address?.address2}
          </SecondaryFont>
          <SecondaryFont>{address?.receiver}</SecondaryFont>
        </LineContainer>
      </AddressInfo>
      {!isPayment && (
        <ButtonContainer>
          <OutlineButton label={"수정"} size={"sm"} onClick={onEdit} />
          <OutlineButton
            label={"삭제"}
            size={"sm"}
            color={"ACCENT1"}
            onClick={handleDeleteAddress}
          />
        </ButtonContainer>
      )}
    </FullContainer>
  );
}

export default AddressItem;
