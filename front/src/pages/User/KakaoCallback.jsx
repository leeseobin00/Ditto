import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate로 변경
import axios from 'axios';
import { login } from '../../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';  // jwt-decode 패키지 가져오기


const KakaoCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    
    if (code) {
      axios.post(`${baseURL}/users/kakao-login`, { code })
        .then(response => {
          const { accessToken, refreshToken, nickname, roleId, domain } = response?.data?.data;

          // JWT 디코딩하여 사용자 정보 추출
          const decodedToken = jwtDecode(accessToken);
          const userId = decodedToken.sub; // JWT의 subject에서 userId 추출
          const email = decodedToken.email; // JWT의 email 클레임에서 email 추출

          dispatch(login({ accessToken, refreshToken, userId, email, nickname, roleId, domain }));
          navigate('/'); // 로그인 후 리디렉션할 페이지로 이동
        })
        .catch(error => {
          console.error('카카오 로그인 에러:', error);
          // 에러 처리 추가 가능: 사용자에게 피드백 제공
        });
    }
  },[]);

  return null; // 필요에 따라 로딩 스피너 등을 반환할 수 있음
};

export default KakaoCallback;