package com.ssafy.ditto.domain.payment.service;

import com.ssafy.ditto.domain.payment.dto.PaymentApprovalRequest;

public interface PaymentService {
    String approvePayment(PaymentApprovalRequest approvalRequest);
    String cancelPayment(int userId, int lectureId);
}
