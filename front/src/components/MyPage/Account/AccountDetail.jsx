import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
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
  margin-bottom: 10px;
  width: 50%;
`;

const Label = styled.label`
  font-weight: bold;
  color: var(--TEXT_SECONDARY);
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  width: 100%;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.$cancel ? 'var(--TEXT_SECONDARY)' : 'var(--SECONDARY)')};
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.8);
  }
`;

const AccountDetail = ({ accountData }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { userId } = useSelector((state) => state.auth);
  const [account, setAccount] = useState({
    accountNumber: '',
    bank: '',
    receiver: '',
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

  const handleCancel = () => {
    if (accountData) {
      setAccount(accountData); // Reset to the initial state from accountData
    }
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${baseURL}/mypage/account/${userId}`, {
        accountNumber: account.accountNumber,
        bank: account.bank,
        receiver: account.receiver,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      alert('계좌 정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('Error updating account data:', error);
      alert('계좌 정보 수정에 실패했습니다.');
    }
  };

  return (
    <Container>
      <AccountForm onSubmit={handleAccountSubmit}>
        <FormGroup>
          <Label>은행명</Label>
          <Select name="bank" value={account.bank} onChange={handleAccountChange}>
            <option value="">선택하세요</option>
            <option value="국민은행">국민은행</option>
            <option value="신한은행">신한은행</option>
            <option value="IBK기업은행">IBK기업은행</option>
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
          <Button type="button" $cancel onClick={handleCancel}>취소</Button>
          <Button type="submit" $primary>수정</Button>
        </ButtonGroup>
      </AccountForm>
    </Container>
  );
};

export default AccountDetail;
