package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class LikeClassResponse {
    private Integer classId;
    private String className;
    private Integer classPrice;
    private Byte classHour;
    private Byte classMinute;
    private Integer likeCount;
    private Integer reviewCount;
    private Integer ratingSum;
    private Integer userId;
    private String nickname;
    private Integer tagId;
    private String tagName;
    private Integer fileId;
    private String fileUrl;
    private Integer likeClassId;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
}