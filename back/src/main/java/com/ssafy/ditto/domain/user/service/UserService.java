package com.ssafy.ditto.domain.user.service;

import com.ssafy.ditto.domain.user.dto.ProSignUpRequest;
import com.ssafy.ditto.domain.user.dto.UserSignUpRequest;

public interface UserService {
    void signup(UserSignUpRequest userSignUpRequest);

    String getTerms(int agreeId);

    void proSignup(ProSignUpRequest proSignUpRequest);
}
