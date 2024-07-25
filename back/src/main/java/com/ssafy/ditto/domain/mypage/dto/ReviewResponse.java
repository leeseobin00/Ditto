package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReviewResponse {
    private Integer reviewId;
    private String reviewContent;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private Boolean isDeleted;
    private Byte rating;
    private Integer fileId;
    private String fileUrl;
    private Integer classId;
    private String className;
    private Integer lectureId;
    private Integer year;
    private Byte month;
    private Byte day;
    private Byte hour;
    private Byte minute;
}
