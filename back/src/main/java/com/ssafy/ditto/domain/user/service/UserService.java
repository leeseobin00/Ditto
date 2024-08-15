package com.ssafy.ditto.domain.user.service;

import com.ssafy.ditto.domain.user.dto.*;
import com.ssafy.ditto.global.jwt.dto.JwtResponse;

import java.security.NoSuchAlgorithmException;

public interface UserService {
    void signup(UserSignUpRequest userSignUpRequest);

    String getTerms(int agreeId);

    void proSignup(UserSignUpRequest userSignUpRequest);

    LoginResponse login(UserLoginRequest userLoginRequest);

    boolean emailDuplicateCheck(String email);

    boolean nickNameDuplicateCheck(String nickname);

    LoginResponse kakaoLogin(KakaoUserLoginRequest kakaoUserLoginRequest) throws NoSuchAlgorithmException;

    void kakaoSignup(KakaoUserLoginRequest kakaoUserLoginRequest) throws NoSuchAlgorithmException;

    String createRandomString() throws NoSuchAlgorithmException;
}
