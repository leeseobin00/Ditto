package com.ssafy.ditto.domain.answer.dto;

import com.ssafy.ditto.domain.answer.domain.Answer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponse {

    @Schema(description = "답변 ID", example = "1")
    private Integer answerId;

    @Schema(description = "답변 내용", example = "이것은 예시 답변입니다.")
    private String answer;

    @Schema(description = "생성 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime createdDate;

    @Schema(description = "수정 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime modifiedDate;

    @Schema(description = "삭제 여부", example = "false")
    private Boolean isDeleted;

    @Schema(description = "사용자 ID", example = "1")
    private Integer userId;

    @Schema(description = "사용자 닉네임", example = "nickname")
    private String userNickname;

    @Schema(description = "질문 ID", example = "1")
    private Integer questionId;

    public static AnswerResponse of(Answer answer) {
        return AnswerResponse.builder()
                .answerId(answer.getAnswerId())
                .answer(answer.getAnswer())
                .createdDate(answer.getCreatedDate())
                .modifiedDate(answer.getModifiedDate())
                .isDeleted(answer.getIsDeleted())
                .userId(answer.getUser().getUserId())
                .userNickname(answer.getUser().getNickname())
                .questionId(answer.getQuestion().getQuestionId())
                .build();
    }
}
