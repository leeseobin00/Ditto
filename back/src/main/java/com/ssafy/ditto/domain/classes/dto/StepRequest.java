package com.ssafy.ditto.domain.classes.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StepRequest {
    private Integer stepNo;
    private String stepName;
    private String stepDetail;
}
