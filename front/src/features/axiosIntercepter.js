// src/features/axiosIntercepter.js
import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../app/store"; // Redux store를 가져옵니다.
import { refresh, logout, sessionExpired } from "./auth/authSlice"; // Redux 액션을 가져옵니다.

// // 기본 axios 인스턴스 설정
// const axiosIntercepter = axios.create({
//   baseURL: 'http://localhost:8080', // 서버의 기본 URL을 설정합니다.
// });
const axiosIntercepter = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // 서버의 기본 URL을 설정합니다.
});

// 요청 인터셉터 설정
axiosIntercepter.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosIntercepter.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 액세스 토큰 만료 오류 감지
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          store.dispatch(sessionExpired()); // 세션 만료 처리
          return Promise.reject(error);
        }
        const response = await axios.post(
          "http://localhost:8080/users/refresh-token",
          {
            refreshToken,
          }
        );

        const newAccessToken = response.data.data;
        store.dispatch(refresh(newAccessToken)); // Redux 상태 업데이트
        localStorage.setItem("accessToken", newAccessToken);
        axiosIntercepter.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosIntercepter(originalRequest);
      } catch (refreshError) {
        console.error("리프레시 토큰 사용 오류:", refreshError);
        store.dispatch(logout()); // 로그아웃 처리
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosIntercepter;
