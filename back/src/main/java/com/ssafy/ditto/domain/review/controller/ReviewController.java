package com.ssafy.ditto.domain.review.controller;

import com.ssafy.ditto.domain.review.dto.ReviewRequest;
import com.ssafy.ditto.domain.review.service.ReviewService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/classes/{classId}/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseDto<Void> createReview(@PathVariable Integer classId, @RequestBody ReviewRequest reviewRequest) {
        reviewService.createReview(classId, reviewRequest);
        return ResponseDto.of(201, "리뷰 작성이 성공적으로 완료되었습니다.");
    }
}
