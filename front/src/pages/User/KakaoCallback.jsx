import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate로 변경
import axios from 'axios';
import { login } from '../../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';  // jwt-decode 패키지 가져오기

const KakaoCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    if (code) {
      axios.post('http://localhost:8080/user/sociallogin', { code })
        .then(response => {
          const { accessToken, refreshToken } = response.data;

          // JWT 디코딩하여 사용자 정보 추출
          const decodedToken = jwtDecode(accessToken);
          const userId = decodedToken.userId;
          const userName = decodedToken.userName;

          dispatch(login({ accessToken, refreshToken, userId, userName }));
          navigate('/'); // 로그인 후 리디렉션할 페이지로 이동
        })
        .catch(error => {
          console.error('카카오 로그인 에러:', error);
        });
    }
  }, [dispatch, location, navigate]); // useNavigate로 변경

  return ;
};

export default KakaoCallback;
