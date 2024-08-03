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
        return ResponseDto.of(200, "내 문의 조회 더보기 성공", questionResponses);
    }

    //Mypage_009
    //Pro_007과 병합


    //Mypage_010
    @GetMapping("{userId}/review")
    public ResponseDto<List<ReviewResponse>> getReviews(@PathVariable("userId") int userId){
        List<ReviewResponse> reviewResponseList = mypageService.getReviews(userId, LocalDateTime.now());
        return ResponseDto.of(200, "내가 작성한 리뷰 조회 성공", reviewResponseList);
    }

    //Mypage_011
    @GetMapping("{userId}/review-more")
    public ResponseDto<List<ReviewResponse>> getReviews(@PathVariable("userId") int userId, @RequestParam("final-date") LocalDateTime finalDate){
        List<ReviewResponse> reviewResponseList = mypageService.getReviews(userId, finalDate);
        return ResponseDto.of(200, "내가 작성한 리뷰 조회 성공", reviewResponseList);
    }

    //Mypage_012
    @GetMapping("{userId}/like/class")
    public ResponseDto<List<LikeClassResponse>> getLikedClasses(@PathVariable("userId") int userId){
        List<LikeClassResponse> likeClassResponseList = mypageService.getLikedClasses(userId, LocalDateTime.now());
        return ResponseDto.of(200, "내 관심 class 목록 조회 완료", likeClassResponseList);
    }

    //Mypage_013
    @GetMapping("{userId}/like/class-more")
    public ResponseDto<List<LikeClassResponse>> getLikedClasses(@PathVariable("userId") int userId, @RequestParam("final-date") LocalDateTime finalDate){
        List<LikeClassResponse> likeClassResponseList = mypageService.getLikedClasses(userId, finalDate);
        return ResponseDto.of(200, "내 관심 class 목록 조회 완료", likeClassResponseList);
    }

    //Mypage_014
    @DeleteMapping("{userId}/like/class/{classId}")
    public ResponseDto<Void> deleteLikedClass(@PathVariable("userId") int userId, @PathVariable("classId") int classId){
        mypageService.deleteLikedClass(userId, classId);
        return ResponseDto.of(200, "좋아요 삭제 완료");
    }

    //Mypage_020
    @GetMapping("{userId}/like/user")
    public ResponseDto<List<LikeUserResponse>> getLikedUsers(@PathVariable("userId") int userId){
        List<LikeUserResponse> likeUserResponseList = mypageService.getLikedUsers(userId, LocalDateTime.now());
        return ResponseDto.of(200, "좋아요한 유저 조회 완료", likeUserResponseList);
    }

    //Mypage_015
    @GetMapping("{userId}/like/user-more")
    public ResponseDto<List<LikeUserResponse>> getLikedUsers(@PathVariable("userId") int userId, @RequestParam("final-date") LocalDateTime finalDate){
        List<LikeUserResponse> likeUserResponseList = mypageService.getLikedUsers(userId, finalDate);
        return ResponseDto.of(200, "좋아요한 유저 조회 완료", likeUserResponseList);
    }

    //Mypage_016
    @DeleteMapping("{userId}/like/user/{cancelUserId}")
    public ResponseDto<Void> deleteLikedUsers(@PathVariable("userId") int likeGiverId, @PathVariable("cancelUserId") int likeGetterId){
        mypageService.deleteLikedUser(likeGiverId, likeGetterId);
        return ResponseDto.of(200, "유저 좋아요 취소 완료");
    }

    //Pro_001
    @GetMapping("pro/{userId}")
    public ResponseDto<ProMypageResponse> getProMypage(@PathVariable("userId") int userId){
        ProMypageResponse proMypageResponse = mypageService.getProMypage(userId);
        return ResponseDto.of(200, "강사 마이페이지 조회 성공", proMypageResponse);
    }

    //Pro_002
    @PatchMapping("account/{userId}")
    public ResponseDto<Void> modifyAccount(@PathVariable("userId") int userId, @RequestBody AccountRequest accountRequest){
        mypageService.modifyAccount(userId, accountRequest);
        return ResponseDto.of(200, "계좌 수정 완료");
    }

    //Pro_003
    @GetMapping("{userId}/mileage")
    public ResponseDto<MileageResponse> getMileage(@PathVariable("userId") int userId){
        MileageResponse mileageResponse = mypageService.getMileage(userId);
        return ResponseDto.of(200, "마일리지 조회 완료", mileageResponse);
    }

    //Pro_004
    @GetMapping("{userId}/mileage/history")
    public ResponseDto<List<MilageHistoryResponse>> getMileageHistory(@PathVariable("userId") int userId){
        List<MilageHistoryResponse> milageHistoryResponseList = mypageService.getMileageHistory(userId, LocalDateTime.now());
        return ResponseDto.of(200, "마일리지 출금기록 조회 완료", milageHistoryResponseList);
    }

    //Pro_004_1
    @GetMapping("{userId}/mileage/history-more")
    public ResponseDto<List<MilageHistoryResponse>> getMileageHistory(@PathVariable("userId") int userId, @RequestParam("final-date") LocalDateTime dateTime){
        List<MilageHistoryResponse> milageHistoryResponseList = mypageService.getMileageHistory(userId, dateTime);
        return ResponseDto.of(200, "마일리지 출금기록 조회 완료", milageHistoryResponseList);
    }

    //Pro_005
    @PostMapping("{userId}/withdraw")
    public ResponseDto<Void> userWithdraw(@PathVariable("userId") int userId, @RequestBody Map<String, Integer> requestMoney){
        mypageService.userWithdraw(userId, requestMoney.get("requestMoney"));
        return ResponseDto.of(200, "출금 신청 완료");
    }

    //Pro_006
    @GetMapping("{userId}/question/pro")
    public ResponseDto<List<QuestionResponse>> getProQuestion(@PathVariable("userId") int userId){
        List<QuestionResponse> questionResponseList = mypageService.getProQuestion(userId, LocalDateTime.now());
        return ResponseDto.of(200, "강사 문의 내역 조회 완료", questionResponseList);
    }

    //Pro_006_1
    @GetMapping("{userId}/question/pro-more")
    public ResponseDto<List<QuestionResponse>> getProQuestion(@PathVariable("userId") int userId, @RequestParam("final-date") LocalDateTime dateTime){
        List<QuestionResponse> questionResponseList = mypageService.getProQuestion(userId, dateTime);
        return ResponseDto.of(200, "강사 문의 내역 더보기 완료", questionResponseList);
    }

    //Pro_007
    //Mypage_009
    @GetMapping("{userId}/answer/{questionId}")
    public ResponseDto<AnswerResponse> getAnswer(@PathVariable("userId") int userId, @PathVariable("questionId") int questionId){
        AnswerResponse answerResponse = mypageService.getAnswer(userId, questionId);
        return ResponseDto.of(200, "답변 조회 성공", answerResponse);
    }

    //Pro_008
    @PostMapping("{userId}/answer/{questionId}")
    public ResponseDto<Void> insertAnswer(@PathVariable("userId") int userId, @PathVariable("questionId") int questionId, @RequestBody Map<String, String> answer){
        mypageService.insertAnswer(userId, questionId, answer.get("answer"));
        return ResponseDto.of(200, "답변 작성 성공");
    }

    //Pro_009
    @PatchMapping("answer/{answerId}")
    public ResponseDto<Void> modifyAnswer(@PathVariable("answerId") int answerId, @RequestBody Map<String, String> answer){
        mypageService.modifyAnswer(answerId, answer.get("answer"));
        return ResponseDto.of(200, "답변 수정 성공");
    }

    //Pro_010
    @DeleteMapping("answer/{answerId}")
    public ResponseDto<Void> deleteAnswer(@PathVariable("answerId") int answerId){
        mypageService.softDeleteAnswer(answerId);
        return ResponseDto.of(200, "답변 삭제 성공");
    }
}
