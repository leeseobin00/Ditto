package com.ssafy.ditto.domain.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@Schema(title = "결제 응답", description = "결제 응답 DTO")
public class PaymentResponse {
    @Schema(description = "결제 ID", example = "1")
    private Integer paymentId;

    @Schema(description = "결제 시간", example = "2023-01-01T00:00:00")
    private LocalDateTime payTime;

    @Schema(description = "결제 취소 시간", example = "2023-01-01T00:00:00")
    private LocalDateTime payCancelTime;

    @Schema(description = "파일 ID", example = "1")
    private Integer fileId;

    @Schema(description = "파일 URL", example = "https://example.com/file")
    private String fileUrl;

    @Schema(description = "강의 ID", example = "1")
    private Integer lectureId;

    @Schema(description = "클래스 ID", example = "1")
    private Integer classId;

    @Schema(description = "클래스명", example = "클래스 이름입니다.")
    private String className;

    @Schema(description = "클래스 가격", example = "10000")
    private Integer classPrice;

    @Schema(description = "연도", example = "2023")
    private Integer year;

    @Schema(description = "월", example = "1")
    private Byte month;

    @Schema(description = "일", example = "1")
    private Byte day;

    @Schema(description = "시간", example = "1")
    private Byte hour;

    @Schema(description = "분", example = "30")
    private Byte minute;

    private Boolean isFinished;
}
