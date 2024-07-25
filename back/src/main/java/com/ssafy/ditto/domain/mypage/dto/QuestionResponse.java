package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class QuestionResponse {
    private Integer questionId;
    private String title;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private Boolean isDeleted;
    private Boolean isAnswered;
    private Integer userId;
    private String nickname;
    private Integer fileId;
    private String fileUrl;
    private Integer lectureId;
    private Integer classId;
    private String className;
    private Integer year;
    private Byte month;
    private Byte day;
    private Byte hour;
    private Byte minute;
}
