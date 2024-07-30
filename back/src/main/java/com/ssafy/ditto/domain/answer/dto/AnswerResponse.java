package com.ssafy.ditto.domain.answer.dto;

import com.ssafy.ditto.domain.answer.domain.Answer;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponse {
    private Integer answerId;
    private String answer;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private Boolean isDeleted;
    private Integer userId;
    private String userNickname;
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
