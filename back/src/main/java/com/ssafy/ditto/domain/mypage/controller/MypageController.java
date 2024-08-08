package com.ssafy.ditto.domain.mypage.controller;

import com.ssafy.ditto.domain.mypage.dto.*;
import com.ssafy.ditto.domain.mypage.service.MypageService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
@Tag(name = "Mypage", description = "Mypage API")
public class MypageController {

    private final MypageService mypageService;

    // Mypage_001
    @Operation(summary = "일반 유저 마이페이지 조회", description = "일반 유저의 마이페이지를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "일반유저 마이페이지 조회 성공")
    @GetMapping("{userId}/normal")
    public ResponseDto<MypageResponse> getMypage(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        MypageResponse mypageResponse = mypageService.getUserMypage(userId);
        return ResponseDto.of(OK.value(), "일반유저 마이페이지 조회 성공", mypageResponse);
    }

    // Mypage_001_1
    @Operation(summary = "일반 유저 배송지 조회", description = "일반 유저의 배송지를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "일반 유저 배송지 조회 성공")
    @GetMapping("{userId}/address")
    public ResponseDto<AddressResponse> getAddress(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        AddressResponse addressResponse = mypageService.getAddress(userId);
        return ResponseDto.of(OK.value(), "일반 유저 배송지 조회 성공", addressResponse);
    }

    //Mypage_002
    @Operation(summary = "일반 유저 마이페이지 수정", description = "일반 유저의 마이페이지를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "일반유저 마이페이지 수정 성공")
    @PatchMapping("{userId}")
    public ResponseDto<String> modifyMypage(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @RequestBody MypageRequest mypageRequest) {
        String nickname = mypageService.modifyUser(userId, mypageRequest);
        return ResponseDto.of(OK.value(), "일반유저 마이페이지 수정 성공", nickname);
    }

    //Mypage_003
    @Operation(summary = "일반 유저 배송지 추가", description = "일반 유저의 배송지를 추가합니다.")
    @ApiResponse(responseCode = "200", description = "일반 유저 배송지 추가 성공")
    @PostMapping("{userId}/address")
    public ResponseDto<Void> insertAddress(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @RequestBody AddressRequest addressRequest) {
        mypageService.insertAddress(userId, addressRequest);
        return ResponseDto.of(OK.value(), "일반 유저 배송지 추가 성공");
    }

    //Mypage_004
    @Operation(summary = "일반 유저 배송지 수정", description = "일반 유저의 배송지를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "일반 유저 배송지 수정 성공")
    @PatchMapping("{userId}/address/{addressId}")
    public ResponseDto<Void> modifyAddress(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "배송지 ID", example = "1") @PathVariable("addressId") int addressId, @RequestBody AddressRequest addressRequest) {
        mypageService.modifyAddress(userId, addressId, addressRequest);
        return ResponseDto.of(OK.value(), "일반 유저 배송지 수정 성공");
    }

    //Mypage_004_1
    @Operation(summary = "일반 유저 배송지 삭제", description = "일반 유저의 배송지를 삭제합니다.")
    @ApiResponse(responseCode = "204", description = "일반 유저 배송지 삭제 성공")
    @DeleteMapping("{userId}/address/{addressId}")
    public ResponseDto<Void> deleteAddress(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "배송지 ID", example = "1") @PathVariable("addressId") int addressId) {
        mypageService.deleteAddress(userId, addressId);
        return ResponseDto.of(NO_CONTENT.value(), "일반 유저 배송지 삭제 성공");
    }

    //Mypage_005
    @Operation(summary = "일반 유저 결제/수강 내역 조회", description = "일반 유저의 결제/수강 내역을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "일반 유저 결제/수강 내역 조회 성공")
    @GetMapping("{userId}/payment")
    public ResponseDto<List<PaymentResponse>> getPayment(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        List<PaymentResponse> paymentResponses = mypageService.getPayment(userId, LocalDateTime.now());
        return ResponseDto.of(OK.value(), "일반 유저 결제/수강 내역 조회 성공", paymentResponses);
    }

    //Mypage_006
    @Operation(summary = "일반 유저 결제/수강 내역 추가 조회", description = "일반 유저의 결제/수강 내역을 추가로 조회합니다.")
    @ApiResponse(responseCode = "200", description = "일반 유저 결제/수강 내역 조회 성공")
    @GetMapping("{userId}/payment-more")
    public ResponseDto<List<PaymentResponse>> getPayment(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "조회 마지막 날짜", example = "2023-01-01T00:00:00") @RequestParam("final-date") LocalDateTime finalDate) {
        List<PaymentResponse> paymentResponses = mypageService.getPayment(userId, finalDate);
        return ResponseDto.of(OK.value(), "일반 유저 결제/수강 내역 조회 성공", paymentResponses);
    }

    //Mypage_017
    @Operation(summary = "환불 규정 조회", description = "환불 규정을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "환불 규정 조회 성공")
    @GetMapping("payment/cancel")
    public ResponseDto<CancelResponse> getCancel() {
        CancelResponse cancelResponse = mypageService.getRefund();
        return ResponseDto.of(OK.value(), "환불 규정 조회 성공", cancelResponse);
    }

    //Mypage_018
    @Operation(summary = "결제/수강 취소", description = "결제/수강을 취소합니다.")
    @ApiResponse(responseCode = "200", description = "결제/수강 취소 완료")
    @PatchMapping("{userId}/payment/cancel")
    public ResponseDto<Void> patchCancel(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @RequestBody Map<String, Integer> lectureId) {
        mypageService.patchRefund(userId, lectureId.get("lectureId"));
        return ResponseDto.of(OK.value(), "결제/수강 취소 완료");
    }

    //Mypage_007
    //SummaryController

    //Mypage_008
    @Operation(summary = "내 문의 조회", description = "내 문의를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "내 문의 조회 성공")
    @GetMapping("{userId}/question")
    public ResponseDto<List<QuestionResponse>> getMyQuestion(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        List<QuestionResponse> questionResponses = mypageService.getMyQuestion(userId, LocalDateTime.now());
        return ResponseDto.of(OK.value(), "내 문의 조회 성공", questionResponses);
    }

    //Mypage_019
    @Operation(summary = "내 문의 더보기 조회", description = "내 문의를 더 조회합니다.")
    @ApiResponse(responseCode = "200", description = "내 문의 조회 더보기 성공")
    @GetMapping("{userId}/question-more")
    public ResponseDto<List<QuestionResponse>> getMyQuestion(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "조회 마지막 날짜", example = "2023-01-01T00:00:00") @RequestParam("final-date") LocalDateTime finalDate) {
        List<QuestionResponse> questionResponses = mypageService.getMyQuestion(userId, finalDate);
        return ResponseDto.of(OK.value(), "내 문의 조회 더보기 성공", questionResponses);
    }

    //Mypage_009
    //Pro_007과 병합


    @Operation(summary = "내가 작성한 리뷰 조회", description = "내가 작성한 리뷰를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "내가 작성한 리뷰 조회 성공")
    @GetMapping("{userId}/review")
    public ResponseDto<List<ReviewResponse>> getReviews(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        List<ReviewResponse> reviewResponseList = mypageService.getReviews(userId, LocalDateTime.now());
        return ResponseDto.of(OK.value(), "내가 작성한 리뷰 조회 성공", reviewResponseList);
    }

    //Mypage_011
    @Operation(summary = "내가 작성한 리뷰 더보기 조회", description = "내가 작성한 리뷰를 더 조회합니다.")
    @ApiResponse(responseCode = "200", description = "내가 작성한 리뷰 조회 성공")
    @GetMapping("{userId}/review-more")
    public ResponseDto<List<ReviewResponse>> getReviews(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "조회 마지막 날짜", example = "2023-01-01T00:00:00") @RequestParam("final-date") LocalDateTime finalDate) {
        List<ReviewResponse> reviewResponseList = mypageService.getReviews(userId, finalDate);
        return ResponseDto.of(OK.value(), "내가 작성한 리뷰 조회 성공", reviewResponseList);
    }

    //Mypage_012
    @Operation(summary = "내 관심 클래스 목록 조회", description = "내 관심 클래스 목록을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "내 관심 class 목록 조회 완료")
    @GetMapping("{userId}/like/class")
    public ResponseDto<List<LikeClassResponse>> getLikedClasses(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        List<LikeClassResponse> likeClassResponseList = mypageService.getLikedClasses(userId, LocalDateTime.now());
        return ResponseDto.of(OK.value(), "내 관심 class 목록 조회 완료", likeClassResponseList);
    }

    //Mypage_013
    @Operation(summary = "내 관심 클래스 목록 더보기 조회", description = "내 관심 클래스 목록을 더 조회합니다.")
    @ApiResponse(responseCode = "200", description = "내 관심 class 목록 조회 완료")
    @GetMapping("{userId}/like/class-more")
    public ResponseDto<List<LikeClassResponse>> getLikedClasses(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "조회 마지막 날짜", example = "2023-01-01T00:00:00") @RequestParam("final-date") LocalDateTime finalDate) {
        List<LikeClassResponse> likeClassResponseList = mypageService.getLikedClasses(userId, finalDate);
        return ResponseDto.of(OK.value(), "내 관심 class 목록 조회 완료", likeClassResponseList);
    }

    //Mypage_014
    @Operation(summary = "좋아요 삭제", description = "좋아요를 삭제합니다.")
    @ApiResponse(responseCode = "204", description = "좋아요 삭제 완료")
    @DeleteMapping("{userId}/like/class/{classId}")
    public ResponseDto<Void> deleteLikedClass(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "클래스 ID", example = "1") @PathVariable("classId") int classId) {
        mypageService.deleteLikedClass(userId, classId);
        return ResponseDto.of(NO_CONTENT.value(), "좋아요 삭제 완료");
    }

    //Mypage_020
    @Operation(summary = "좋아요한 유저 조회", description = "좋아요한 유저를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "좋아요한 유저 조회 완료")
    @GetMapping("{userId}/like/user")
    public ResponseDto<List<LikeUserResponse>> getLikedUsers(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        List<LikeUserResponse> likeUserResponseList = mypageService.getLikedUsers(userId, LocalDateTime.now());
        return ResponseDto.of(OK.value(), "좋아요한 유저 조회 완료", likeUserResponseList);
    }

    //Mypage_015
    @Operation(summary = "좋아요한 유저 더보기 조회", description = "좋아요한 유저를 더 조회합니다.")
    @ApiResponse(responseCode = "200", description = "좋아요한 유저 조회 완료")
    @GetMapping("{userId}/like/user-more")
    public ResponseDto<List<LikeUserResponse>> getLikedUsers(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "조회 마지막 날짜", example = "2023-01-01T00:00:00") @RequestParam("final-date") LocalDateTime finalDate) {
        List<LikeUserResponse> likeUserResponseList = mypageService.getLikedUsers(userId, finalDate);
        return ResponseDto.of(OK.value(), "좋아요한 유저 조회 완료", likeUserResponseList);
    }

    //Mypage_016
    @Operation(summary = "유저 좋아요 취소", description = "유저에 대한 좋아요를 취소합니다.")
    @ApiResponse(responseCode = "204", description = "유저 좋아요 취소 완료")
    @DeleteMapping("{userId}/like/user/{cancelUserId}")
    public ResponseDto<Void> deleteLikedUsers(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int likeGiverId, @Parameter(description = "취소할 유저 ID", example = "2") @PathVariable("cancelUserId") int likeGetterId) {
        mypageService.deleteLikedUser(likeGiverId, likeGetterId);
        return ResponseDto.of(NO_CONTENT.value(), "유저 좋아요 취소 완료");
    }

    //Pro_001
    @Operation(summary = "강사 마이페이지 조회", description = "강사 마이페이지를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "강사 마이페이지 조회 성공")
    @GetMapping("pro/{userId}")
    public ResponseDto<ProMypageResponse> getProMypage(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        ProMypageResponse proMypageResponse = mypageService.getProMypage(userId);
        return ResponseDto.of(OK.value(), "강사 마이페이지 조회 성공", proMypageResponse);
    }

    //Pro_002
    @Operation(summary = "계좌 수정", description = "강사의 계좌 정보를 수정합니다.")
    @ApiResponse(responseCode = "200", description = "계좌 수정 완료")
    @PatchMapping("account/{userId}")
    public ResponseDto<Void> modifyAccount(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @RequestBody AccountRequest accountRequest) {
        mypageService.modifyAccount(userId, accountRequest);
        return ResponseDto.of(OK.value(), "계좌 수정 완료");
    }

    //Pro_003
    @Operation(summary = "마일리지 조회", description = "마일리지를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "마일리지 조회 완료")
    @GetMapping("{userId}/mileage")
    public ResponseDto<MileageResponse> getMileage(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        MileageResponse mileageResponse = mypageService.getMileage(userId);
        return ResponseDto.of(OK.value(), "마일리지 조회 완료", mileageResponse);
    }

    //Pro_004
    @Operation(summary = "마일리지 출금기록 조회", description = "마일리지 출금기록을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "마일리지 출금기록 조회 완료")
    @GetMapping("{userId}/mileage/history")
    public ResponseDto<List<MilageHistoryResponse>> getMileageHistory(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        List<MilageHistoryResponse> milageHistoryResponseList = mypageService.getMileageHistory(userId, LocalDateTime.now());
        return ResponseDto.of(OK.value(), "마일리지 출금기록 조회 완료", milageHistoryResponseList);
    }

    //Pro_004_1
    @Operation(summary = "마일리지 출금기록 더보기 조회", description = "마일리지 출금기록을 더 조회합니다.")
    @ApiResponse(responseCode = "200", description = "마일리지 출금기록 조회 완료")
    @GetMapping("{userId}/mileage/history-more")
    public ResponseDto<List<MilageHistoryResponse>> getMileageHistory(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "조회 마지막 날짜", example = "2023-01-01T00:00:00") @RequestParam("final-date") LocalDateTime dateTime) {
        List<MilageHistoryResponse> milageHistoryResponseList = mypageService.getMileageHistory(userId, dateTime);
        return ResponseDto.of(OK.value(), "마일리지 출금기록 조회 완료", milageHistoryResponseList);
    }

    //Pro_005
    @Operation(summary = "출금 신청", description = "마일리지 출금 신청을 합니다.")
    @ApiResponse(responseCode = "200", description = "출금 신청 완료")
    @PostMapping("{userId}/withdraw")
    public ResponseDto<Void> userWithdraw(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @RequestBody Map<String, Integer> requestMoney) {
        boolean success = mypageService.userWithdraw(userId, requestMoney.get("requestMoney"));
        if (success) {
            return ResponseDto.of(OK.value(), "출금 신청 완료");
        } else {
            return ResponseDto.of(400, "마일리지 부족");
        }
    }

    //Pro_006
    @Operation(summary = "강사 문의 내역 조회", description = "강사의 문의 내역을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "강사 문의 내역 조회 완료")
    @GetMapping("{userId}/question/pro")
    public ResponseDto<List<QuestionResponse>> getProQuestion(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId) {
        List<QuestionResponse> questionResponseList = mypageService.getProQuestion(userId, LocalDateTime.now());
        return ResponseDto.of(OK.value(), "강사 문의 내역 조회 완료", questionResponseList);
    }

    //Pro_006_1
    @Operation(summary = "강사 문의 내역 더보기 조회", description = "강사의 문의 내역을 더 조회합니다.")
    @ApiResponse(responseCode = "200", description = "강사 문의 내역 더보기 완료")
    @GetMapping("{userId}/question/pro-more")
    public ResponseDto<List<QuestionResponse>> getProQuestion(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "조회 마지막 날짜", example = "2023-01-01T00:00:00") @RequestParam("final-date") LocalDateTime dateTime) {
        List<QuestionResponse> questionResponseList = mypageService.getProQuestion(userId, dateTime);
        return ResponseDto.of(OK.value(), "강사 문의 내역 더보기 완료", questionResponseList);
    }

    //Pro_007
    //Mypage_009
    @Operation(summary = "답변 조회", description = "답변을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "답변 조회 성공")
    @GetMapping("{userId}/answer/{questionId}")
    public ResponseDto<AnswerResponse> getAnswer(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "문의 ID", example = "1") @PathVariable("questionId") int questionId) {
        AnswerResponse answerResponse = mypageService.getAnswer(userId, questionId);
        return ResponseDto.of(OK.value(), "답변 조회 성공", answerResponse);
    }

    //Pro_008
    @Operation(summary = "답변 작성", description = "답변을 작성합니다.")
    @ApiResponse(responseCode = "204", description = "답변 작성 성공")
    @PostMapping("{userId}/answer/{questionId}")
    public ResponseDto<Void> insertAnswer(@Parameter(description = "유저 ID", example = "1") @PathVariable("userId") int userId, @Parameter(description = "문의 ID", example = "1") @PathVariable("questionId") int questionId, @RequestBody Map<String, String> answer) {
        mypageService.insertAnswer(userId, questionId, answer.get("answer"));
        return ResponseDto.of(CREATED.value(), "답변 작성 성공");
    }

    //Pro_009
    @Operation(summary = "답변 수정", description = "답변을 수정합니다.")
    @ApiResponse(responseCode = "200", description = "답변 수정 성공")
    @PatchMapping("answer/{answerId}")
    public ResponseDto<Void> modifyAnswer(@Parameter(description = "답변 ID", example = "1") @PathVariable("answerId") int answerId, @RequestBody Map<String, String> answer) {
        mypageService.modifyAnswer(answerId, answer.get("answer"));
        return ResponseDto.of(OK.value(), "답변 수정 성공");
    }

    //Pro_010
    @Operation(summary = "답변 삭제", description = "답변을 삭제합니다.")
    @ApiResponse(responseCode = "204", description = "답변 삭제 성공")
    @DeleteMapping("answer/{answerId}")
    public ResponseDto<Void> deleteAnswer(@Parameter(description = "답변 ID", example = "1") @PathVariable("answerId") int answerId) {
        mypageService.softDeleteAnswer(answerId);
        return ResponseDto.of(NO_CONTENT.value(), "답변 삭제 성공");
    }
}
