package com.ssafy.ditto.domain.classes.dto;

import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.user.dto.UserResponse;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassResponse {
    private Integer classId;
    private String className;
    private Integer classPrice;
    private Byte classHour;
    private Byte classMinute;
    private String classExplanation;
    private Byte classMin;
    private Byte classMax;
    private Integer studentSum;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private Boolean isDeleted;
    private Integer likeCount;
    private Integer reviewCount;
    private Float averageRating;
    private String userNickname;
    private FileResponse file;
    private UserResponse user;
}