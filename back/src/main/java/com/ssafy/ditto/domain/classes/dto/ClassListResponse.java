package com.ssafy.ditto.domain.classes.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassListResponse {
    private List<ClassResponse> classList;

    public static ClassListResponse of(List<ClassResponse> classResponses) {
        return ClassListResponse.builder()
                .classList(classResponses)
                .build();
    }
}