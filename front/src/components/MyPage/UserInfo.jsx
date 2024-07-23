import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/default-profile.jpg';
import axiosIntercepter from '../../features/axiosIntercepter'; // axiosIntercepter 가져오기

const UserInfoContainer = styled.div`
  margin-bottom: 40px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--BORDER_COLOR);
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  flex: 1;
`;

const ProfileField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  width: 400px;
`;

const InputLabel = styled.label`
  font-weight: bold;
  color: var(--TEXT_SECONDARY);
  margin-bottom: 5px;
`;

const ProfileInput = styled.input`
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.$cancel ? 'var(--TEXT_SECONDARY)' : 'var(--PRIMARY)')};
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.8);
  }
`;

const ErrorMessage = styled.p`
  color: var(--RED);
  margin: 5px 0 0 0;
`;

const UserInfo = ({ userData }) => {
  const { email, nickName, userId } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    nickname: nickName || '',
  });
  const [error, setError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setFormData({
      password: '',
      confirmPassword: '',
      nickname: nickName || '',
    });
  }, [nickName]);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      password: '',
      confirmPassword: '',
      nickname: nickName || '',
    });
    setError('');
  };

  const handleSave = async () => {
    if (!passwordMatch) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axiosIntercepter.patch(`/mypage/${userId}`, {
        password: formData.password,
        nickname: formData.nickname,
      });

      if (response.status === 200) {
        console.log('수정 성공:', formData);
      } else {
        setError('수정 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('저장 에러:', error);
      setError('저장 실패. 다시 시도해주세요.');
    }
  };

  return (
    <UserInfoContainer>
      <ProfileImageContainer>
        <ProfileImage src={userData.fileUrl || defaultProfile} alt="Profile" />
      </ProfileImageContainer>
      <ProfileInfo>
        <ProfileField>
          <InputLabel>Email</InputLabel>
          <ProfileInput type="text" value={email || ''} readOnly />
        </ProfileField>
        <ProfileField>
          <InputLabel>PW</InputLabel>
          <ProfileInput
            type="password"
            placeholder="비밀번호"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </ProfileField>
        <ProfileField>
          <InputLabel>PW 확인</InputLabel>
          <ProfileInput
            type="password"
            placeholder="비밀번호 확인"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {!passwordMatch && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </ProfileField>
        <ProfileField>
          <InputLabel>닉네임</InputLabel>
          <ProfileInput
            type="text"
            placeholder={formData.nickname || "닉네임"}
            name="nickname"
            value={formData.nickname || ''}
            onChange={handleChange}
          />
        </ProfileField>
      </ProfileInfo>
      <ButtonGroup>
        <Button $cancel onClick={handleCancel}>취소</Button>
        <Button onClick={handleSave}>저장</Button>
      </ButtonGroup>
    </UserInfoContainer>
  );
};

export default UserInfo;
