import React from 'react';
import kakaoLoginImage from '../../../assets/kakao_login_large_wide.png'
import styled from 'styled-components';

const StyledImg = styled.img`
  width: 280px;
  height: 40px;
  margin: 0px 24px 16px 24px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.8);
  }
`;

const KakaoLogin = () => {
  const CLIENT_ID = '6e58cec5e631373e4c3d4724ce2c0d6c';
  const REDIRECT_URI = 'http://localhost:8080/callback';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;


  return (
    <StyledImg
      alt="카카오 로그인"
      src={kakaoLoginImage} // 실제 카카오 로그인 버튼 이미지 경로를 입력하세요
      width="300"
      height="40"
      style={{ margin: '0px 24px 16px 24px', cursor: 'pointer', boxShadow: '0.3s' }}
      onClick={() => window.location.href = kakaoURL}
    />
  );
};

export default KakaoLogin;
