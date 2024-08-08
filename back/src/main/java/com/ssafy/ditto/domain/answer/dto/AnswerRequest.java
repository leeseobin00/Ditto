package com.ssafy.ditto.domain.answer.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerRequest {

    @Schema(description = "답변 내용", example = "예시 답변입니다.")
    private String answer;

    @Schema(description = "사용자 ID", example = "1")
    private Integer userId;
}

