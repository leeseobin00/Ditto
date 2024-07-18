// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axiosIntercepter from '../../features/axiosIntercepter';
import { login } from '../../features/auth/authSlice';
import KakaoLogin from './KaKaoLogin';

// 스타일링 컴포넌트 정의
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--LIGHT);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  background-color: var(--LIGHT);
  text-align: center;
`;

const FormTitle = styled.h2`
  margin-bottom: 10px;
  text-align: center;
  color: var(--TEXT_SECONDARY);
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  width: 300px;
`;

const FormLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
  color: var(--TEXT_SECONDARY);
  min-width: 80px; /* 라벨의 최소 너비 설정 */
  text-align: right;
`;

const FormInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid var(--BORDER_COLOR);
  border-radius: 15px;
  font-size: 16px;
  &:focus {
    border-color: var(--PRIMARY);
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: var(--LIGHT);
  border: none;
  border-radius: 4px;
  color: var(--PRIMARY);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--BORDER_COLOR);
  }
  &::before {
    margin-right: 10px;
  }
  &::after {
    margin-left: 10px;
  }
`;

const LoginDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 10px 0px;
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--BORDER_COLOR);
  }
`;

const SocialGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
`;

const SocialLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 40px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;

  ${(props) => {
    if (props.$provider === 'kakao') {
      return `
        background-color: #fee500;
        color: var(--DARK);
      `;
    } else if (props.$provider === 'google') {
      return `
        background-color: var(--LIGHT);
        color: var(--DARK);
        border: 1px solid var(--BORDER_COLOR);
      `;
    } else if (props.$provider === 'naver') {
      return `
        background-color: #03c75a;
        color: var(--LIGHT);
      `;
    }
  }}

  &:hover {
    opacity: 0.9;
  }
`;

const SignUpLink = styled.a`
  display: block;
  margin-top: 20px;
  color: var(--PRIMARY);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const response = await axiosIntercepter.post('/user/login', {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data;
      dispatch(login({ accessToken, refreshToken })); // Redux 상태 업데이트
      alert("로그인 성공!");
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 실패. 다시 시도해주세요.");
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleLogin}>
        <FormTitle>로그인</FormTitle>
        <LoginDivider />
        <LoginGroup>
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>PW</FormLabel>
          <FormInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        </LoginGroup>
        <SubmitButton type="submit">로그인</SubmitButton>
        <Divider>간편 로그인</Divider>
        <SocialGroup>       
            <KakaoLogin />
        </SocialGroup>
        <div>회원이 아니신가요?</div>
        <SignUpLink href="#"> 회원가입</SignUpLink>
      </StyledForm>
    </FormContainer>
  );
};

export default LoginForm;