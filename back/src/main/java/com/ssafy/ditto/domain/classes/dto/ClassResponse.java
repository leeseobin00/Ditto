package com.ssafy.ditto.domain.classes.dto;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.tag.dto.TagResponse;
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
    private TagResponse tag;

    public static ClassResponse of(DClass dClass) {
        return ClassResponse.builder()
                .classId(dClass.getClassId())
                .className(dClass.getClassName())
                .classPrice(dClass.getClassPrice())
                .classHour(dClass.getClassHour())
                .classMinute(dClass.getClassMinute())
                .classExplanation(dClass.getClassExplanation())
                .classMin(dClass.getClassMin())
                .classMax(dClass.getClassMax())
                .studentSum(dClass.getStudentSum())
                .createdDate(dClass.getCreatedDate())
                .modifiedDate(dClass.getModifiedDate())
                .isDeleted(dClass.getIsDeleted())
                .likeCount(dClass.getLikeCount())
                .reviewCount(dClass.getReviewCount())
                .averageRating(dClass.getReviewCount() == 0 ? 0 : (float) dClass.getRatingSum() / dClass.getReviewCount())
                .userNickname(dClass.getUserId().getNickname())
                .file(dClass.getFileId() != null ? FileResponse.builder()
                        .fileId(dClass.getFileId().getFileId())
                        .uploadFileName(dClass.getFileId().getUploadFileName())
                        .fileUrl(dClass.getFileId().getFileUrl())
                        .build() : null)
                .user(UserResponse.of(dClass.getUserId()))
                .tag(TagResponse.of(dClass.getTagId()))
                .build();
    }
}
