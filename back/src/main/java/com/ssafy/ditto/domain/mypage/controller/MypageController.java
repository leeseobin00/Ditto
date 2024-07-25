package com.ssafy.ditto.domain.mypage.controller;

import com.ssafy.ditto.domain.mypage.dto.*;
import com.ssafy.ditto.domain.mypage.service.MypageService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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
    @GetMapping("{userId}/payment")
    public ResponseDto<List<PaymentResponse>> getPayment(@PathVariable("userId") int userId){
        List<PaymentResponse> paymentResponses = mypageService.getPayment(userId, LocalDateTime.now());
        return ResponseDto.of(200, "일반 유저 결제/수강 내역 조회 성공", paymentResponses);
    }

    //Mypage_006
    @GetMapping("{userId}/payment-more")
    public ResponseDto<List<PaymentResponse>> getPayment(@PathVariable("userId") int userId, @RequestParam("final-date") LocalDateTime finalDate){
        List<PaymentResponse> paymentResponses = mypageService.getPayment(userId, finalDate);
        return ResponseDto.of(200, "일반 유저 결제/수강 내역 조회 성공", paymentResponses);
    }

    //Mypage_017
    @GetMapping("payment/cancel")
    public ResponseDto<CancelResponse> getCancel(){
        CancelResponse cancelResponse = mypageService.getRefund();
        return ResponseDto.of(200, "환불 규정 조회 성공", cancelResponse);
    }

    //Mypage_018
    @PatchMapping("{userId}/payment/cancel")
    public ResponseDto<Void> patchCancel(@PathVariable("userId") int userId, @RequestBody Map<String, Integer> lectureId) {
        mypageService.patchRefund(userId, lectureId.get("lectureId"));
        return ResponseDto.of(200, "결제/수강 취소 완료");
    }

    //Mypage_007
    @GetMapping("lecture/{lectureId}/summary")
    public ResponseDto<List<SummaryResponse>> getSummary(@PathVariable("lectureId") int lectureId) {
        List<SummaryResponse> summaryResponses = mypageService.getSummary(lectureId);
        return ResponseDto.of(200, "요약 조회 성공", summaryResponses);
    }

    //Mypage_008
    @GetMapping("{userId}/question")
    public ResponseDto<List<QuestionResponse>> getMyQuestion(@PathVariable("userId") int userId){
        List<QuestionResponse> questionResponses = mypageService.getMyQuestion(userId, LocalDateTime.now());
        return ResponseDto.of(200, "내 문의 조회 성공", questionResponses);
    }

    //Mypage_019
    @GetMapping("{userId}/question-more")
    public ResponseDto<List<QuestionResponse>> getMyQuestion(@PathVariable("userId") int userId, @RequestParam("final-date") LocalDateTime finalDate){
        List<QuestionResponse> questionResponses = mypageService.getMyQuestion(userId, finalDate);
        return ResponseDto.of(200, "내 문의 조회 성공", questionResponses);
    }

    //Mypage_009
    @GetMapping("{userId}/question/{questionId}")
    public ResponseDto<AnswerResponse> getAnswer(@PathVariable("userId") int userId, @PathVariable("questionId") int questionId){
        AnswerResponse answerResponse = mypageService.getAnswer(userId, questionId);
        return ResponseDto.of(200, "내 문의에 달린 답변 조회 성공", answerResponse);
    }
}
