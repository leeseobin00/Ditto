package com.ssafy.ditto.domain.summary.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "요약 응답", description = "요약 응답 DTO")
public class SummaryResponse {
    @Schema(description = "단계 Id", example = "1")
    private Byte stepNo;

    @Schema(description = "단계 정보", example = "굳히기 단계")
    private String stepName;

    @Schema(description = "요약 내용", example = "요약 내용입니다.")
    private String summaryContent;
}
