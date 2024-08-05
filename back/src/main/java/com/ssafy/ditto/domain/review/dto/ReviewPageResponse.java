package com.ssafy.ditto.domain.review.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewPageResponse {
    private List<ReviewDetailResponse> reviews;
    private int currentPage;
    private int totalPageCount;

    public static ReviewPageResponse of(List<ReviewDetailResponse> reviews, int currentPage, int totalPageCount) {
        return ReviewPageResponse.builder()
                .reviews(reviews)
                .currentPage(currentPage)
                .totalPageCount(totalPageCount)
                .build();
    }
}