package com.ssafy.ditto.domain.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "취소 응답", description = "취소 응답 DTO")
public class CancelResponse {
    @Schema(description = "환불 ID", example = "1")
    private Integer refundId;

    @Schema(description = "환불 내용", example = "환불 규정 내용입니다.")
    private String refund;
}
