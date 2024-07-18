import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      Cookies.set("refreshToken", action.payload.refreshToken, { expires: 7, secure: true, sameSite: 'strict' }); // Refresh Token을 쿠키에 저장
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      Cookies.remove("refreshToken"); // 쿠키에서 리프레시 토큰 제거
    },
    refresh: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    sessionExpired: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { login, logout, refresh, sessionExpired } = authSlice.actions;

export default authSlice.reducer;
