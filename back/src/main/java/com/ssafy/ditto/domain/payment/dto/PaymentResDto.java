package com.ssafy.ditto.domain.payment.dto;

import com.ssafy.ditto.domain.payment.domain.Payment;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResDto {
    private PayType payType;
    private Long amount;
    private String orderName;
    private String orderId;
    private Integer customerId;
    private String customerName;
    private String successUrl;
    private String failUrl;

    private String failReason;
    private boolean cancelYN;
    private String cancelReason;
    private LocalDateTime createdAt;

    public PaymentResDto(Payment payment, PaymentDto paymentDto) {
        this.payType = payment.getPayType();
        this.amount = payment.getAmount();
        this.orderName = payment.getOrderName();
        this.orderId = payment.getOrderId();
        this.customerId = payment.getUserId().getUserId();
        this.customerName = payment.getUserId().getNickname();
        this.successUrl = paymentDto.getSuccessUrl();
        this.failUrl = paymentDto.getFailUrl();
        this.failReason = payment.getFailReason();
        this.cancelYN = payment.isCancelYN();
        this.cancelReason = payment.getCancelReason();
        this.createdAt = LocalDateTime.now();
    }
}
