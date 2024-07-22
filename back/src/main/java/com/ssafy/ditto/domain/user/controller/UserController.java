package com.ssafy.ditto.domain.user.controller;

import com.ssafy.ditto.domain.user.dto.ProSignUpRequest;
import com.ssafy.ditto.domain.user.dto.UserSignUpRequest;
import com.ssafy.ditto.domain.user.service.UserService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    // signup_001
    @PostMapping("/signup")
    public ResponseDto<Void> signup(@RequestBody UserSignUpRequest userSignUpRequest) {
        userService.signup(userSignUpRequest);
        return ResponseDto.of(201, "일반 회원 가입 성공");
    }

    //singup_002
    @GetMapping("/signup/{agreeId}")
    public ResponseDto<String> getTerms(@PathVariable("agreeId") int id){
        String term = userService.getTerms(id);
        return ResponseDto.of(201, "동의 조회 성공", term);
    }

    //singup_003
    @PostMapping("signup/form")
    public ResponseDto<Void> proSignup(@RequestBody ProSignUpRequest proSignUpRequest){
        userService.proSignup(proSignUpRequest);
        return ResponseDto.of(201, "강사 회원 가입 성공");
    }

}
