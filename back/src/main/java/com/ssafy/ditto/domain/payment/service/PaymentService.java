package com.ssafy.ditto.domain.payment.service;

import com.ssafy.ditto.domain.payment.domain.Payment;
import com.ssafy.ditto.domain.payment.dto.ChargingHistoryDto;
import com.ssafy.ditto.domain.payment.dto.PaymentSuccessDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.Map;

public interface PaymentService {
    Payment requestTossPayment(Payment payment, Integer userId);

    PaymentSuccessDto tossPaymentSuccess(String paymentKey, String orderId, Long amount);

    PaymentSuccessDto requestPaymentAccept(String paymentKey, String orderId, Long amount);

    Slice<ChargingHistoryDto> findAllChargingHistories(Integer userId, Pageable pageable);

    Payment verifyPayment(String orderId, Long amount);

    void tossPaymentFail(String code, String message, String orderId);

    Map<String, String> cancelPaymentPoint(Integer userId, String paymentKey, String cancelReason);

    Map tossPaymentCancel(String paymentKey, String cancelReason);
}
