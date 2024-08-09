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

    @Schema(description = "현재 페이지", example = "1")
    private Integer currentPage;

    @Schema(description = "전체 페이지 수", example = "10")
    private Integer totalPages;

    public static ClassListResponse of(List<ClassResponse> classResponses) {
        return ClassListResponse.builder()
                .classList(classResponses)
                .build();
    }
}
