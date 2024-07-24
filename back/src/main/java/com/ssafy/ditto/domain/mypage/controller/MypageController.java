package com.ssafy.ditto.domain.mypage.controller;

import com.ssafy.ditto.domain.mypage.dto.AddressRequest;
import com.ssafy.ditto.domain.mypage.dto.MypageRequest;
import com.ssafy.ditto.domain.mypage.dto.MypageResponse;
import com.ssafy.ditto.domain.mypage.service.MypageService;
import com.ssafy.ditto.domain.mypage.dto.PaymentResponse;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MypageController {

    private final MypageService mypageService;

    // Mypage_001
    @GetMapping("{userId}/normal")
    public ResponseDto<MypageResponse> getMypage(@PathVariable("userId") int userId){
        MypageResponse mypageResponse = mypageService.getUserMypage(userId);
        return ResponseDto.of(200, "일반유저 마이페이지 조회 성공", mypageResponse);
    }

    //Mypage_002
    @PatchMapping("{userId}")
    public ResponseDto<String> modifyMypage(@PathVariable("userId") int userId, @RequestBody MypageRequest mypageRequest){
        String nickname = mypageService.modifyUser(userId, mypageRequest);
        return ResponseDto.of(200, "일반유저 마이페이지 수정 성공", nickname);
    }

    //Mypage_003
    @PostMapping("{userId}/address")
    public ResponseDto<Void> insertAddress(@PathVariable("userId") int userId, @RequestBody AddressRequest addressRequest){
        mypageService.insertAddress(userId, addressRequest);
        return ResponseDto.of(200, "일반 유저 배송지 추가 성공");
    }

    //Mypage_004
    @PatchMapping("{userId}/address/{addressId}")
    public ResponseDto<Void> modifyAddress(@PathVariable("userId") int userId, @PathVariable("addressId") int addressId, @RequestBody AddressRequest addressRequest){
        mypageService.modifyAddress(userId, addressId, addressRequest);
        return ResponseDto.of(200, "일반 유저 배송지 수정 성공");
    }

    //Mypage_004_1
    @DeleteMapping("{userId}/address/{addressId}")
    public ResponseDto<Void> deleteAddress(@PathVariable("userId") int userId, @PathVariable("addressId") int addressId){
        mypageService.deleteAddress(userId, addressId);
        return ResponseDto.of(200, "일반 유저 배송지 삭제 성공");
    }

    //Mypage_005
    @GetMapping("{userID}/payment")
    public ResponseDto<List<PaymentResponse>> getPayment(@PathVariable("userId") int userId){
        List<PaymentResponse> paymentResponse = mypageService.getPayment(userId);
        return ResponseDto.of(200, "일반 유저 결제/수강 내역 조회 성공", paymentResponse);
    }
}
