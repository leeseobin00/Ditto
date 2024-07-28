package com.ssafy.ditto.domain.question.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionRequest {
    private String title;
    private String content;
    private Integer userId;
    private Integer lectureId;
}