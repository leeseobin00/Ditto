package com.ssafy.ditto.domain.payment.dto;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    private String method;
    private String orderId;
    private int amount;
    private String orderName;
    private String successUrl;
    private String failUrl;
}
