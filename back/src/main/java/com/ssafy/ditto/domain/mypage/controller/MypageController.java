package com.ssafy.ditto.domain.mypage.controller;

import com.ssafy.ditto.domain.mypage.dto.MypageRequest;
import com.ssafy.ditto.domain.mypage.dto.MypageResponse;
import com.ssafy.ditto.domain.mypage.service.MypageService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MypageController {

    private final MypageService mypageService;

    @GetMapping("{userId}/normal")
    public ResponseDto<MypageResponse> getMypage(@PathVariable("userId") int userId){
        MypageResponse mypageResponse = mypageService.getUserAddress(userId);
        return ResponseDto.of(200, "일반유저 마이페이지 조회 성공", mypageResponse);
    }

    @PatchMapping("{userId}")
    public ResponseDto<String> editMypage(@PathVariable("userId") int userId, @RequestBody MypageRequest mypageRequest){
        String nickname = mypageService.editUser(userId, mypageRequest);
        return ResponseDto.of(200, "일반유저 마이페이지 수정 성공", nickname);
    }
}
