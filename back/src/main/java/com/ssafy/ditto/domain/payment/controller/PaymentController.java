package com.ssafy.ditto.domain.payment.controller;

import com.ssafy.ditto.domain.payment.dto.*;
import com.ssafy.ditto.domain.payment.service.PaymentServiceImpl;
import com.ssafy.ditto.global.config.TossPaymentConfig;
import com.ssafy.ditto.global.dto.ResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@Validated
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentServiceImpl paymentService;
    private final TossPaymentConfig tossPaymentConfig;

    @PostMapping("/toss")
    public ResponseEntity<ResponseDto<PaymentResDto>> requestTossPayment(
            @RequestParam("userId") Integer userId, @RequestBody @Valid PaymentDto paymentReqDto) {
        PaymentResDto paymentResDto = new PaymentResDto(paymentService.requestTossPayment(paymentReqDto.toEntity(), userId), paymentReqDto);
        paymentResDto.setSuccessUrl(paymentReqDto.getSuccessUrl() == null ? tossPaymentConfig.getSuccessUrl() : paymentReqDto.getSuccessUrl());
        paymentResDto.setFailUrl(paymentReqDto.getFailUrl() == null ? tossPaymentConfig.getFailUrl() : paymentReqDto.getFailUrl());
        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK.value(), "결제 요청 성공", paymentResDto));
    }

    @GetMapping("/toss/success")
    public ResponseEntity<ResponseDto<PaymentSuccessDto>> tossPaymentSuccess(
            @RequestParam String paymentKey,
            @RequestParam String orderId,
            @RequestParam Long amount
    ) {
        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK.value(), "결제 성공", paymentService.tossPaymentSuccess(paymentKey, orderId, amount)));
    }

    @GetMapping("/toss/fail")
    public ResponseEntity<ResponseDto<PaymentFailDto>> tossPaymentFail(
            @RequestParam String code,
            @RequestParam String message,
            @RequestParam String orderId
    ) {
        paymentService.tossPaymentFail(code, message, orderId);
        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK.value(), "결제 실패",
                PaymentFailDto.builder()
                        .errorCode(code)
                        .errorMessage(message)
                        .orderId(orderId)
                        .build()
        ));
    }

    @PostMapping("/toss/cancel/point")
    public ResponseEntity<ResponseDto<Map<String, String>>> tossPaymentCancelPoint(
            @RequestParam("userId") Integer userId,
            @RequestParam String paymentKey,
            @RequestParam String cancelReason
    ) {
        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK.value(), "결제 취소 성공",
                paymentService.cancelPaymentPoint(userId, paymentKey, cancelReason)));
    }

    @GetMapping("/history")
    public ResponseEntity<ResponseDto<Slice<ChargingHistoryDto>>> getChargingHistory(
            @RequestParam("userId") Integer userId, Pageable pageable) {
        Slice<ChargingHistoryDto> chargingHistories = paymentService.findAllChargingHistories(userId, pageable);
        return ResponseEntity.ok().body(ResponseDto.of(HttpStatus.OK.value(), "결제 내역 조회 성공", chargingHistories));
    }
}
