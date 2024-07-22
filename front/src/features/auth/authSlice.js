// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    userId: localStorage.getItem("userId") || null,  // 사용자 ID 추가
    nickName: localStorage.getItem("nickName") || null,  // 닉네임으로 변경
    email: localStorage.getItem("email") || null,  // 사용자 이메일 추가
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.userId = action.payload.userId;  // 사용자 ID 설정
      state.nickName = action.payload.nickName;  // 닉네임 설정
      state.email = action.payload.email;  // 사용자 이메일 설정
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("userId", action.payload.userId);  // 사용자 ID 저장
      localStorage.setItem("nickName", action.payload.nickName);  // 닉네임 저장
      localStorage.setItem("email", action.payload.email);  // 사용자 이메일 저장
      Cookies.set("refreshToken", action.payload.refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.userId = null;  // 사용자 ID 초기화
      state.nickName = null;  // 닉네임 초기화
      state.email = null;  // 사용자 이메일 초기화
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");  // 사용자 ID 제거
      localStorage.removeItem("nickName");  // 닉네임 제거
      localStorage.removeItem("email");  // 사용자 이메일 제거
      Cookies.remove("refreshToken");
    },
    refresh: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    sessionExpired: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.userId = null;  // 사용자 ID 초기화
      state.nickName = null;  // 닉네임 초기화
      state.email = null;  // 사용자 이메일 초기화
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");  // 사용자 ID 제거
      localStorage.removeItem("nickName");  // 닉네임 제거
      localStorage.removeItem("email");  // 사용자 이메일 제거
    },
  },
});

export const { login, logout, refresh, sessionExpired } = authSlice.actions;

export default authSlice.reducer;
