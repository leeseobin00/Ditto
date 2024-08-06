package com.ssafy.ditto.domain.payment.controller;

import com.ssafy.ditto.domain.payment.dto.PaymentApprovalRequest;
import com.ssafy.ditto.domain.payment.service.PaymentService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.ditto.global.dto.ResponseMessage.SUCCESS_WRITE;
import static org.springframework.http.HttpStatus.OK;

@RestController
@Validated
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/approve")
    public ResponseDto<String> approvePayment(@RequestBody PaymentApprovalRequest approvalRequest) {
        return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(), paymentService.approvePayment(approvalRequest));
    }
}
