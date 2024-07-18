import React from 'react';
import kakaoLoginImage from '../../assets/kakao_login_medium_narrow.png'

const KakaoLogin = () => {
  const CLIENT_ID = import.meta.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.REACT_APP_REDIRECT_URL;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <img
      alt="카카오 로그인"
      src={kakaoLoginImage} // 실제 카카오 로그인 버튼 이미지 경로를 입력하세요
      width="150"
      height="30"
      style={{ margin: '0px 24px 16px 24px' }}
      onClick={() => window.location.href = kakaoURL}
    />
  );
};

export default KakaoLogin;
