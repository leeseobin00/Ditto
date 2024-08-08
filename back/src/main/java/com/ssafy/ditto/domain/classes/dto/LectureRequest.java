package com.ssafy.ditto.domain.classes.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LectureRequest {

    @Schema(description = "년도", example = "2024")
    private Integer year;

    @Schema(description = "월", example = "7")
    private Byte month;

    @Schema(description = "일", example = "9")
    private Byte day;

    @Schema(description = "시", example = "14")
    private Byte hour;

    @Schema(description = "분", example = "30")
    private Byte minute;
}
