package com.ssafy.ditto.domain.question.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionPageResponse {

    @Schema(description = "문의 목록")
    private List<QuestionResponse> questions;

    @Schema(description = "현재 페이지", example = "1")
    private int currentPage;

    @Schema(description = "총 페이지 수", example = "5")
    private int totalPageCount;

    public static QuestionPageResponse of(List<QuestionResponse> questions, int currentPage, int totalPageCount) {
        return QuestionPageResponse.builder()
                .questions(questions)
                .currentPage(currentPage)
                .totalPageCount(totalPageCount)
                .build();
    }
}
