import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import OutlineButton from "../../common/OutlineButton";
import RoundButton from "../../common/RoundButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  margin-top: 10px;
`;

const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 20px;
  width: 50%;
`;

const Label = styled.label`
  font-weight: bold;
  color: var(--TEXT_SECONDARY);
  margin-bottom: 10px;
`;

const Input = styled.input`
  font-family: inherit;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  width: 100%;
  &:focus {
    border-style: solid;
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const Select = styled.select`
  font-family: inherit;
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  width: 100%;
  font-size: 16px;
  &:focus {
    border-style: solid;
    border-width: 2px;
    border-color: var(--SECONDARY);
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`;

const AccountDetail = ({ accountData }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { userId } = useSelector((state) => state.auth);
  const [account, setAccount] = useState({
    accountNumber: "",
    bank: "",
    receiver: "",
  });

  useEffect(() => {
    if (accountData) {
      setAccount(accountData);
    }
  }, [accountData]);

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (accountData) {
      setAccount(accountData); // Reset to the initial state from accountData
    }
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${baseURL}/mypage/account/${userId}`,
        {
          accountNumber: account.accountNumber,
          bank: account.bank,
          receiver: account.receiver,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: '수정 완료',
        text: '계좌 정보가 성공적으로 수정되었습니다.',
        confirmButtonColor: '#FF7F50',
        confirmButtonText: '확인'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: '수정 실패',
        text: '계좌 정보 수정에 실패했습니다. 다시 시도해주세요.',
        confirmButtonColor: '#FF7F50',
        confirmButtonText: '확인'
      });
    }
  };

  return (
    <Container>
      <AccountForm onSubmit={handleAccountSubmit}>
        <FormGroup>
          <Label>은행명</Label>
          <Select
            name="bank"
            value={account.bank}
            onChange={handleAccountChange}
          >
            <option value="">선택하세요</option>
            <option value="국민은행">국민은행</option>
            <option value="신한은행">신한은행</option>
            <option value="우리은행">우리은행</option>
            <option value="IBK기업은행">IBK기업은행</option>
            <option value="카카오뱅크">카카오뱅크</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>계좌번호</Label>
          <Input
            type="text"
            name="accountNumber"
            value={account.accountNumber}
            onChange={handleAccountChange}
            placeholder="계좌번호를 입력하세요"
          />
        </FormGroup>
        <FormGroup>
          <Label>예금주</Label>
          <Input
            type="text"
            name="receiver"
            value={account.receiver}
            onChange={handleAccountChange}
            placeholder="예금주를 입력하세요"
          />
        </FormGroup>
        <ButtonGroup>
          <OutlineButton
            label={"취소"}
            color={"default"}
            $cancel
            onClick={handleCancel}
          />
          <RoundButton label={"수정"} onClick={handleAccountSubmit} />
        </ButtonGroup>
      </AccountForm>
    </Container>
  );
};

export default AccountDetail;
