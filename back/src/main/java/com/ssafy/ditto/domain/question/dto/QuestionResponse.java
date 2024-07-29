package com.ssafy.ditto.domain.question.dto;

import com.ssafy.ditto.domain.question.domain.Question;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {
    private Integer questionId;
    private String title;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private Boolean isDeleted;
    private Boolean isAnswered;
    private Integer userId;
    private String userNickname;
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
