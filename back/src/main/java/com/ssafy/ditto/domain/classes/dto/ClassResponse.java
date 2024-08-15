package com.ssafy.ditto.domain.classes.dto;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.tag.dto.TagResponse;
import com.ssafy.ditto.domain.user.dto.UserResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassResponse {

    @Schema(description = "클래스 ID", example = "1")
    private Integer classId;

    @Schema(description = "클래스 이름", example = "즐거운 뜨개질 강의")
    private String className;

    @Schema(description = "클래스 가격", example = "50000")
    private Integer classPrice;

    @Schema(description = "클래스 시간(시)", example = "1")
    private Byte classHour;

    @Schema(description = "클래스 시간(분)", example = "30")
    private Byte classMinute;

    @Schema(description = "클래스 설명", example = "Spring Boot를 이용한 웹 애플리케이션 개발 강의입니다.")
    private String classExplanation;

    @Schema(description = "최소 수강 인원", example = "5")
    private Byte classMin;

    @Schema(description = "최대 수강 인원", example = "20")
    private Byte classMax;

    @Schema(description = "학생 수", example = "15")
    private Integer studentSum;

    @Schema(description = "생성 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime createdDate;

    @Schema(description = "수정 날짜", example = "2023-01-01T00:00:00")
    private LocalDateTime modifiedDate;

    @Schema(description = "삭제 여부", example = "false")
    private Boolean isDeleted;

    @Schema(description = "좋아요 수", example = "100")
    private Integer likeCount;

    @Schema(description = "리뷰 수", example = "50")
    private Integer reviewCount;

    @Schema(description = "평균 평점", example = "4.5")
    private Float averageRating;

    @Schema(description = "사용자 닉네임", example = "nickname")
    private String userNickname;

    @Schema(description = "파일 정보")
    private FileResponse file;

    @Schema(description = "사용자 정보")
    private UserResponse user;

    @Schema(description = "태그 정보")
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
