package com.ssafy.ditto.domain.review.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {
    private String reviewContent;
    private Byte rating;
    private Integer userId;
    private Integer lectureId;
}
