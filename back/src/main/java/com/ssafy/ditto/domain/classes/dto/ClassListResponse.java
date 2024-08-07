package com.ssafy.ditto.domain.classes.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassListResponse {

    @Schema(description = "클래스 목록")
    private List<ClassResponse> classList;

    public static ClassListResponse of(List<ClassResponse> classResponses) {
        return ClassListResponse.builder()
                .classList(classResponses)
                .build();
    }
}
