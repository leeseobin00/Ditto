package com.ssafy.ditto.domain.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@Schema(title = "마일리지 이력 응답", description = "마일리지 이력 응답 DTO")
public class MilageHistoryResponse {
    @Schema(description = "이력 ID", example = "1")
    private Integer historyId;

    @Schema(description = "클래스명", example = "클래스 이름입니다.")
    private String className;

    @Schema(description = "마일리지 금액", example = "1000")
    private Integer mileageAmount;

    @Schema(description = "시간", example = "2023-01-01T00:00:00")
    private LocalDateTime time;

    @Schema(description = "상태", example = "1")
    private Integer state;

    @Schema(description = "최종 금액", example = "10000")
    private Integer finalAmount;
}
