package com.ssafy.ditto.domain.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@Schema(title = "답변 응답", description = "답변 응답 DTO")
public class AnswerResponse {
    @Schema(description = "답변 ID", example = "1")
    private Integer answerId;

    @Schema(description = "답변 내용", example = "답변 내용입니다.")
    private String answer;

    @Schema(description = "생성 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime createdDate;

    @Schema(description = "수정 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime modifiedDate;

    @Schema(description = "삭제 여부", example = "false")
    private Boolean isDeleted;

    @Schema(description = "답변자 닉네임", example = "홍길동")
    private String nickname;
}
