package com.ssafy.ditto.domain.review.dto;

import com.ssafy.ditto.domain.classes.dto.ClassDetailResponse;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;
import com.ssafy.ditto.domain.review.domain.Review;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.dto.UserResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDetailResponse {

    @Schema(description = "리뷰 ID", example = "1")
    private Integer reviewId;

    @Schema(description = "리뷰 내용", example = "This is a great class!")
    private String reviewContent;

    @Schema(description = "평점", example = "5")
    private Byte rating;

    @Schema(description = "리뷰어 정보")
    private UserResponse reviewer;

    @Schema(description = "강사 정보")
    private UserResponse teacher;

    @Schema(description = "클래스 상세 정보")
    private ClassDetailResponse classDetail;

    @Schema(description = "강의 상세 정보")
    private LectureResponse lectureDetail;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    public static ReviewDetailResponse of(Review review, User reviewer, User teacher) {
        return ReviewDetailResponse.builder()
                .reviewId(review.getReviewId())
                .reviewContent(review.getReviewContent())
                .rating(review.getRating())
                .createdDate(review.getCreatedDate())
                .modifiedDate(review.getModifiedDate())
                .reviewer(UserResponse.of(reviewer))
                .teacher(UserResponse.of(teacher))
                .classDetail(ClassDetailResponse.of(review.getDclass(), null, null, null, null, null, null))
                .lectureDetail(LectureResponse.of(review.getLecture()))
                .build();
    }
}
