package com.ssafy.ditto.domain.payment.service;

import com.ssafy.ditto.domain.payment.dto.PaymentApprovalRequest;

public interface PaymentService {

//    String requestPayment(PaymentRequest paymentRequest);

    String approvePayment(PaymentApprovalRequest approvalRequest);
}
