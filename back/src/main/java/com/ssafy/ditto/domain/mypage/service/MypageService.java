package com.ssafy.ditto.domain.mypage.service;

import com.ssafy.ditto.domain.mypage.dto.*;

import java.time.LocalDateTime;
import java.util.List;

public interface MypageService {
    MypageResponse getUserMypage(int userId);

    String modifyUser(int userId, MypageRequest mypageRequest);

    void insertAddress(int userId, AddressRequest addressRequest);

    void modifyAddress(int userId, int addressId, AddressRequest addressRequest);

    void deleteAddress(int userId, int addressId);

    List<PaymentResponse> getPayment(int userId, LocalDateTime finalDate);

    CancelResponse getRefund();

    void patchRefund(int userId, int lectureId);

    List<SummaryResponse> getSummary(int lectureId);

    List<QuestionResponse> getMyQuestion(int userId, LocalDateTime dateTime);

    List<ReviewResponse> getReviews(int userId, LocalDateTime dateTime);

    List<LikeClassResponse> getLikedClasses(int userId, LocalDateTime finalDate);


    // 프로 마이페이지 시작부분
    ProMypageResponse getProMypage(int userId);

    void modifyAccount(int userId, AccountRequest accountRequest);

    MileageResponse getMileage(int userId);

    List<MilageHistoryResponse> getMileageHistory(int userId, LocalDateTime dateTime);

    void userWithdraw(int userId, Integer requestMoney);

    List<QuestionResponse> getProQuestion(int userId, LocalDateTime now);

    AnswerResponse getAnswer(int userId, int questionId);

    void insertAnswer(int userId, int questionId, String ans);

    void modifyAnswer(int answerId, String ans);

    void deleteAnswer(int answerId);
}
