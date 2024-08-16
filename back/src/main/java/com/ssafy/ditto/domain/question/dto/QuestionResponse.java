package com.ssafy.ditto.domain.question.dto;

import com.ssafy.ditto.domain.question.domain.Question;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {

    @Schema(description = "문의 ID", example = "1")
    private Integer questionId;

    @Schema(description = "문의 제목", example = "Question about the class")
    private String title;

    @Schema(description = "문의 내용", example = "Could you provide more details on the curriculum?")
    private String content;

    @Schema(description = "생성 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime createdDate;

    @Schema(description = "수정 날짜", example = "2023-01-02T00:00:00")
    private LocalDateTime modifiedDate;

    @Schema(description = "삭제 여부", example = "false")
    private Boolean isDeleted;

    @Schema(description = "답변 여부", example = "false")
    private Boolean isAnswered;

    @Schema(description = "사용자 ID", example = "1")
    private Integer userId;

    @Schema(description = "사용자 닉네임", example = "john_doe")
    private String userNickname;

    @Schema(description = "클래스 ID", example = "1")
    private Integer classId;

    public static QuestionResponse of(Question question) {
        return QuestionResponse.builder()
                .questionId(question.getQuestionId())
                .title(question.getTitle())
                .content(question.getContent())
                .createdDate(question.getCreatedDate())
                .modifiedDate(question.getModifiedDate())
                .isDeleted(question.getIsDeleted())
                .isAnswered(question.getIsAnswered())
                .userId(question.getUser().getUserId())
                .userNickname(question.getUser().getNickname())
                .classId(question.getDclass().getClassId())
                .build();
    }
}
