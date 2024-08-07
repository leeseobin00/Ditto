package com.ssafy.ditto.domain.question.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionRequest {
    @Schema(description = "문의 제목", example = "문의 제목 입니다.")
    private String title;

    @Schema(description = "문의 내용", example = "문의 내용 입니다.")
    private String content;

    @Schema(description = "사용자 ID", example = "1")
    private Integer userId;
}
