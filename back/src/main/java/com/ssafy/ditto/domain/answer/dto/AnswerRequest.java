package com.ssafy.ditto.domain.answer.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerRequest {
    private String answer;
    private Integer userId;
}
