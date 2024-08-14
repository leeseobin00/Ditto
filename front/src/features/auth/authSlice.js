// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    userId: localStorage.getItem("userId") || null,
    nickname: localStorage.getItem("nickname") || null,
    email: localStorage.getItem("email") || null,
    roleId: localStorage.getItem("roleId") || null,
    domain: localStorage.getItem("domain") || null,
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.roleId = action.payload.roleId;
      state.domain = action.payload.domain;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("nickname", action.payload.nickname);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("roleId", action.payload.roleId);
      localStorage.setItem("domain", action.payload.domain);
      Cookies.set("refreshToken", action.payload.refreshToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.userId = null;
      state.nickname = null;
      state.roleId = null;
      state.email = null;
      state.domain = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("nickname");
      localStorage.removeItem("email");
      Cookies.remove("refreshToken");
      localStorage.removeItem("roleId");
      localStorage.removeItem("domain");
    },
    refresh: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    sessionExpired: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.userId = null;
      state.nickname = null;
      state.email = null;
      state.domain = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("nickname");
      localStorage.removeItem("email");
      localStorage.removeItem("roleId");
      localStorage.removeItem("domain");
    },
    changeNickname: (state, action) => {
      state.nickname = action.payload.nickname;
      localStorage.setItem("nickname", action.payload.nickname);
    }
  },
});

export const { login, logout, refresh, sessionExpired, changeNickname } = authSlice.actions;

export default authSlice.reducer;
