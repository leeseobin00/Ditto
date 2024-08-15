package com.ssafy.ditto.domain.classes.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StepRequest {

    @Schema(description = "스텝 번호", example = "1")
    private Integer stepNo;

    @Schema(description = "스텝 이름", example = "스텝 1")
    private String stepName;

    @Schema(description = "스텝 설명", example = "즐거운 뜨개질 초기 준비 단계입니다.")
    private String stepDetail;
}
