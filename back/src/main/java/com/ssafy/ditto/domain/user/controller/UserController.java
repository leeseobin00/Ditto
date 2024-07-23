package com.ssafy.ditto.domain.user.controller;

import com.ssafy.ditto.domain.user.dto.EmailCodeRequest;
import com.ssafy.ditto.domain.user.dto.ProSignUpRequest;
import com.ssafy.ditto.domain.user.dto.UserLoginRequest;
import com.ssafy.ditto.domain.user.dto.UserSignUpRequest;
import com.ssafy.ditto.domain.user.service.EmailService;
import com.ssafy.ditto.domain.user.service.UserService;
import com.ssafy.ditto.global.dto.ResponseDto;
import com.ssafy.ditto.global.jwt.dto.JwtResponse;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final EmailService emailService;

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

    //signup-004
    @PostMapping("signup/email")
    public ResponseDto<Void> mailSend(@RequestBody String email) throws MessagingException, NoSuchAlgorithmException {
        if (userService.emailDuplicateCheck(email)){
            return ResponseDto.of(409, "해당 이메일을 사용하는 계정이 이미 존재합니다.");
        }
        emailService.sendEmail(email);
        return ResponseDto.of(201, "인증번호를 발송했습니다.");
    }

    //signup-005
    @PostMapping("signup/auth")
    public ResponseDto<Void> checkCode(@RequestBody EmailCodeRequest emailCodeRequest){
        if(emailService.checkCode(emailCodeRequest)){
            return ResponseDto.of(201, "이메일 인증에 성공했습니다.");
        } else {
            return ResponseDto.of(409, "코드가 일치하지 않습니다.");
        }
    }

    //signup-006
    @GetMapping("signup/nickname/{nickname}")
    public ResponseDto<Void> nickNameDuplicateCheck(@PathVariable("nickname") String nickname){
        if (userService.nickNameDuplicateCheck(nickname)){
            return ResponseDto.of(409, "이미 사용중인 닉네임입니다.");
        } else {
            return ResponseDto.of(201, "사용 가능한 닉네임입니다.");
        }
    }


    //login_001
    //jwt에 있는 유저 정보 : 이메일
    @PostMapping("/login")
    public ResponseDto<JwtResponse> login(@RequestBody UserLoginRequest userLoginRequest){
        JwtResponse jwtResponse = userService.login(userLoginRequest);
        if (jwtResponse == null){
            return ResponseDto.of(400, "로그인 실패", null);
        } else {
            return ResponseDto.of(201, "로그인 성공", jwtResponse);
        }
    }
}
