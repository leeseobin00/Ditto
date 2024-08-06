package com.ssafy.ditto.domain.payment.dto;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentApprovalRequest {
    private String paymentKey;
    private String orderId;
    private int amount;
}
