package com.ssafy.ditto.domain.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@Schema(title = "질문 응답", description = "질문 응답 DTO")
public class QuestionResponse {
    @Schema(description = "질문 ID", example = "1")
    private Integer questionId;

    @Schema(description = "제목", example = "질문 제목입니다.")
    private String title;

    @Schema(description = "내용", example = "질문 내용입니다.")
    private String content;

    @Schema(description = "생성 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime createdDate;

    @Schema(description = "수정 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime modifiedDate;

    @Schema(description = "삭제 여부", example = "false")
    private Boolean isDeleted;

    @Schema(description = "답변 여부", example = "true")
    private Boolean isAnswered;

    @Schema(description = "유저 ID", example = "1")
    private Integer userId;

    @Schema(description = "닉네임", example = "홍길동")
    private String nickname;

    @Schema(description = "파일 ID", example = "1")
    private Integer fileId;

    @Schema(description = "파일 URL", example = "https://example.com/file")
    private String fileUrl;

    @Schema(description = "클래스 ID", example = "1")
    private Integer classId;

    @Schema(description = "클래스명", example = "클래스 이름입니다.")
    private String className;
}
