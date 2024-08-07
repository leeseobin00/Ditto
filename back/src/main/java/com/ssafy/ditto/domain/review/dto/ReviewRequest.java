package com.ssafy.ditto.domain.review.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {
    @Schema(description = "리뷰 내용", example = "This is a great class!")
    private String reviewContent;

    @Schema(description = "평점", example = "5")
    private Byte rating;

    @Schema(description = "사용자 ID", example = "1")
    private Integer userId;

    @Schema(description = "강의 ID", example = "1")
    private Integer lectureId;
}
