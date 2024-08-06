package com.ssafy.ditto.domain.payment.controller;

import com.ssafy.ditto.domain.payment.dto.PaymentApprovalRequest;
import com.ssafy.ditto.domain.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/approve")
    public String approvePayment(@RequestBody PaymentApprovalRequest approvalRequest) {
        return paymentService.approvePayment(approvalRequest);
    }
}
