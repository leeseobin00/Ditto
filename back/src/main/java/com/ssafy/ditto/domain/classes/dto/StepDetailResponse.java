package com.ssafy.ditto.domain.classes.dto;

import com.ssafy.ditto.domain.file.dto.FileResponse;
import lombok.*;
import com.ssafy.ditto.domain.classes.domain.Step;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StepDetailResponse {
    private Integer stepId;
    private Byte stepNo;
    private String stepName;
    private String stepDetail;
    private FileResponse file;

    public static StepDetailResponse of(Step step, FileResponse fileResponse) {
        return StepDetailResponse.builder()
                .stepNo(step.getStepNo())
                .stepName(step.getStepName())
                .stepDetail(step.getStepDetail())
                .file(fileResponse)
                .build();
    }
}
