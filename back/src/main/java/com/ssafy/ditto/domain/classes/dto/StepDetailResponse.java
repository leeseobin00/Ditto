package com.ssafy.ditto.domain.classes.dto;

import com.ssafy.ditto.domain.classes.domain.Step;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StepDetailResponse {

    @Schema(description = "스텝 ID", example = "1")
    private Integer stepId;

    @Schema(description = "스텝 번호", example = "1")
    private Byte stepNo;

    @Schema(description = "스텝 이름", example = "스텝 1")
    private String stepName;

    @Schema(description = "스텝 설명", example = "즐거운 뜨개질 초기 준비 단계입니다.")
    private String stepDetail;

    @Schema(description = "파일 정보")
    private FileResponse file;

    public static StepDetailResponse of(Step step, FileResponse fileResponse) {
        return StepDetailResponse.builder()
                .stepId(step.getStepId())
                .stepNo(step.getStepNo())
                .stepName(step.getStepName())
                .stepDetail(step.getStepDetail())
                .file(fileResponse)
                .build();
    }
}
