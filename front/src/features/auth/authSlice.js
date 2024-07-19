// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    userName: localStorage.getItem("userName") || null,  // 사용자 이름 추가
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.userName = action.payload.userName;  // 사용자 이름 설정
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("userName", action.payload.userName);  // 사용자 이름 저장
      Cookies.set("refreshToken", action.payload.refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.userName = null;  // 사용자 이름 초기화
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");  // 사용자 이름 제거
      Cookies.remove("refreshToken");
    },
    refresh: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    sessionExpired: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.userName = null;  // 사용자 이름 초기화
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");  // 사용자 이름 제거
    },
  },
});

export const { login, logout, refresh, sessionExpired } = authSlice.actions;

export default authSlice.reducer;
