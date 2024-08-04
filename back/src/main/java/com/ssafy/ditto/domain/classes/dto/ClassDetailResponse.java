package com.ssafy.ditto.domain.classes.dto;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.tag.dto.TagResponse;
import com.ssafy.ditto.domain.user.dto.UserResponse;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassDetailResponse {
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

    private FileResponse file;
    private KitDetailResponse kit;
    private List<StepDetailResponse> steps;
    private List<LectureResponse> lectures;
    private UserResponse user;
    private TagResponse tag;

    public static ClassDetailResponse of(DClass dClass, FileResponse fileResponse, KitDetailResponse kitDetailResponse, List<StepDetailResponse> stepDetailResponses, List<LectureResponse> lectureResponses, UserResponse userResponse, TagResponse tagResponse) {
        return ClassDetailResponse.builder()
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
                .file(fileResponse)
                .kit(kitDetailResponse)
                .steps(stepDetailResponses)
                .lectures(lectureResponses)
                .user(userResponse)
                .tag(tagResponse)
                .build();
    }
}