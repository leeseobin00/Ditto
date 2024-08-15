import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import Button from "../../components/common/Button";

const AddressLineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  width: 100%;
`;

const Label = styled.div`
  width: 12%;
  min-width: 57px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 5px;
`;

const Input = styled.input`
  font-family: inherit;
  border-radius: 20px;
  width: 70%;
  margin: 3px 0;
  height: 30px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--BORDER_COLOR);
  padding: 10px;

  &:focus {
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
  &::placeholder {
    font-size: 14px;
  }
`;

const AddressInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 5px;
`;

const AddressInputLine = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const PostNumLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CheckboxInput = styled.input`
  width: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
`;

const CheckboxLabel = styled.div`
  font-size: 16px;
  color: var(--TEXT_SECONDARY);
`;

// 다음 주소 API 호출
const loadDaumPostcode = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

function AddressInput({ onChange, initialddress, isEdit = false }) {
  const [addressName, setAddressName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [receiver, setReceiver] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (isEdit && initialddress) {
      setAddressName(initialddress.addressName);
      setZipCode(initialddress.zipCode);
      setAddress1(initialddress.address1);
      setAddress2(initialddress.address2);
      setPhoneNumber(initialddress.phoneNumber);
      setReceiver(initialddress.receiver);
      setIsDefault(initialddress.isDefault);
    }
  }, [
    initialddress?.addressName,
    initialddress?.zipCode,
    initialddress?.address1,
    initialddress?.address2,
    initialddress?.phoneNumber,
    initialddress?.receiver,
    initialddress?.isDefault,
  ]);

  const updateAddressData = useCallback(() => {
    onChange({
      addressName,
      zipCode,
      address1,
      address2,
      phoneNumber,
      receiver,
      isDefault,
    });
  }, [
    addressName,
    zipCode,
    address1,
    address2,
    phoneNumber,
    receiver,
    isDefault,
  ]);

  // updateThumbnailData를 상태가 변경될 때만 호출하도록 useEffect를 설정합니다.
  useEffect(() => {
    updateAddressData();
  }, [
    addressName,
    zipCode,
    address1,
    address2,
    phoneNumber,
    receiver,
    isDefault,
  ]);

  const detailAddressRef = useRef();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setZipCode(data.zonecode);
    setAddress1(fullAddress);
  };

  const handleSearchAddress = async () => {
    await loadDaumPostcode();
    new window.daum.Postcode({
      oncomplete: handleComplete,
    }).open();
  };

  return (
    <>
      <AddressLineContainer>
        <Label>배송지명</Label>
        <Input
          type="text"
          name="addressName"
          value={addressName}
          onChange={(e) => setAddressName(e.target.value)}
        />
      </AddressLineContainer>
      <AddressInputContainer>
        <Label style={{ alignItems: "flex-start" }}>주소</Label>
        <AddressInputLine>
          <PostNumLine>
            <Input
              type="text"
              style={{ width: "55%" }}
              placeholder="우편번호"
              name="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              readOnly
            />
            <Button
              size={"sm"}
              label={"우편번호 검색"}
              onClick={handleSearchAddress}
            />
          </PostNumLine>
          <Input
            type="text"
            placeholder="도로명(지번) 주소"
            name="address1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            readOnly
            style={{ width: "100%" }}
          />
          <Input
            type="text"
            placeholder="상세 주소"
            name="address2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            ref={detailAddressRef}
            style={{ width: "100%" }}
          />
        </AddressInputLine>
      </AddressInputContainer>
      <AddressLineContainer>
        <Label>연락처</Label>
        <Input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
        />
      </AddressLineContainer>
      <AddressLineContainer>
        <Label>수령인</Label>
        <Input
          type="text"
          name="receiver"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
      </AddressLineContainer>
      <AddressLineContainer style={{ justifyContent: "flex-end" }}>
        <CheckboxInput
          type="checkbox"
          name="isDefault"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
        />
        <CheckboxLabel>기본 배송지로 설정</CheckboxLabel>
      </AddressLineContainer>
    </>
  );
}

export default AddressInput;
