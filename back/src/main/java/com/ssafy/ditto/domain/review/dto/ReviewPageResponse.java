package com.ssafy.ditto.domain.review.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewPageResponse {

    @Schema(description = "리뷰 목록")
    private List<ReviewDetailResponse> reviews;

    @Schema(description = "현재 페이지", example = "1")
    private int currentPage;

    @Schema(description = "총 페이지 수", example = "5")
    private int totalPageCount;

    public static ReviewPageResponse of(List<ReviewDetailResponse> reviews, int currentPage, int totalPageCount) {
        return ReviewPageResponse.builder()
                .reviews(reviews)
                .currentPage(currentPage)
                .totalPageCount(totalPageCount)
                .build();
    }
}
