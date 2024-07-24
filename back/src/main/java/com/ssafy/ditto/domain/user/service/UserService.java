package com.ssafy.ditto.domain.user.service;

import com.ssafy.ditto.domain.user.dto.LoginResponse;
import com.ssafy.ditto.domain.user.dto.ProSignUpRequest;
import com.ssafy.ditto.domain.user.dto.UserLoginRequest;
import com.ssafy.ditto.domain.user.dto.UserSignUpRequest;
import com.ssafy.ditto.global.jwt.dto.JwtResponse;

public interface UserService {
    void signup(UserSignUpRequest userSignUpRequest);

    String getTerms(int agreeId);

    void proSignup(ProSignUpRequest proSignUpRequest);

    LoginResponse login(UserLoginRequest userLoginRequest);

    boolean emailDuplicateCheck(String email);

    boolean nickNameDuplicateCheck(String nickname);
}
