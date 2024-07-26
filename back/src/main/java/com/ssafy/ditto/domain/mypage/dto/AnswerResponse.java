package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AnswerResponse {
    private Integer answerId;
    private String answer;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private Boolean isDeleted;
    private String nickname;
}
