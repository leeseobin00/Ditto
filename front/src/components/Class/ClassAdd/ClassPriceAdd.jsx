import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Dollar from "../../../assets/icon/class/dollar.png";

const PriceAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 80px;
  border-style: solid;
  border-width: 0.5px;
  border-radius: 10px;
  border-color: var(--BORDER_COLOR);
  box-shadow: 1px 1px 5px #767676;
  justify-content: center;
  padding: 0 10px;
  margin-left: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Input = styled.input`
  font-family: inherit;
  font-size: inherit;
  font-size: 25px;
  font-weight: 600;
  color: var(--PRIMARY);
  background-color: transparent;
  border-style: none;
  border-radius: 25px;
  width: 145px;
  text-align: center;
  &::placeholder {
    color: var(--PRIMARY);
    font-size: 15px;
  }
  &:focus {
    border-style: solid;
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const Currency = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: var(--TEXT_SECONDARY);
  margin-left: 5px;
`;

function ClassPriceAdd({ onChange }) {
  const [classPrice, setClassPrice] = useState("");

  useEffect(() => {
    onChange(classPrice);
  }, [classPrice, onChange]);

  function handleInputChange(e) {
    setClassPrice(e.target.value);
  }

  return (
    <PriceAddContainer>
      <InputContainer>
        <Icon src={Dollar} />
        <Input
          type="text"
          placeholder="가격을 입력해주세요."
          value={classPrice}
          onChange={handleInputChange}
        />
        {classPrice && <Currency>원</Currency>}
      </InputContainer>
    </PriceAddContainer>
  );
}

export default ClassPriceAdd;
