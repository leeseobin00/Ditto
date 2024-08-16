package com.ssafy.ditto.domain.payment.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentApprovalRequest {
    @Schema(description = "결제 키", example = "test_paymentKey")
    private String paymentKey;

    @Schema(description = "주문 ID", example = "test_orderId")
    private String orderId;

    @Schema(description = "결제 금액", example = "1000")
    private Integer amount;

    @Schema(description = "사용자 ID", example = "1")
    private Integer userId;

    @Schema(description = "강의 ID", example = "1")
    private Integer lectureId;
}
