package com.ssafy.ditto.domain.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "요약 응답", description = "요약 응답 DTO")
public class SummaryResponse {
    @Schema(description = "요약 ID", example = "1")
    private Integer summaryId;

    @Schema(description = "단계 ID", example = "1")
    private Integer stepId;

    @Schema(description = "요약 내용", example = "요약 내용입니다.")
    private String summaryContent;
}
