package com.ssafy.ditto.domain.review.dto;

import com.ssafy.ditto.domain.classes.dto.ClassDetailResponse;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;
import com.ssafy.ditto.domain.review.domain.Review;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.dto.UserResponse;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDetailResponse {
    private Integer reviewId;
    private String reviewContent;
    private Byte rating;
    private UserResponse reviewer;
    private UserResponse teacher;
    private ClassDetailResponse classDetail;
    private LectureResponse lectureDetail;

    public static ReviewDetailResponse of(Review review, User reviewer, User teacher) {
        return ReviewDetailResponse.builder()
                .reviewId(review.getReviewId())
                .reviewContent(review.getReviewContent())
                .rating(review.getRating())
                .reviewer(UserResponse.of(reviewer))
                .teacher(UserResponse.of(teacher))
                .classDetail(ClassDetailResponse.of(review.getClassId(), null, null, null, null, null, null))
                .lectureDetail(LectureResponse.of(review.getLectureId()))
                .build();
    }
}
