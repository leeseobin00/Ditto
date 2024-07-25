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

    AnswerResponse getAnswer(int userId, int questionId);

    List<ReviewResponse> getReviews(int userId, LocalDateTime dateTime);
}
