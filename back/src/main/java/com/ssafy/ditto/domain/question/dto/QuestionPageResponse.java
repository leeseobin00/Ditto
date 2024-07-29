package com.ssafy.ditto.domain.question.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionPageResponse {
    private List<QuestionResponse> questions;
    private int currentPage;
    private int totalPageCount;
}
