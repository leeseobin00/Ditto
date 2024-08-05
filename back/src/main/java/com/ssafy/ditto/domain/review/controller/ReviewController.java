package com.ssafy.ditto.domain.review.controller;

import com.ssafy.ditto.domain.review.dto.ReviewPageResponse;
import com.ssafy.ditto.domain.review.dto.ReviewRequest;
import com.ssafy.ditto.domain.review.service.ReviewService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
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

    @PatchMapping("/{reviewId}")
    public ResponseDto<Void> updateReview(@PathVariable Integer classId, @PathVariable Integer reviewId, @RequestBody ReviewRequest reviewRequest) {
        reviewService.updateReview(classId, reviewId, reviewRequest);
        return ResponseDto.of(200, "리뷰 수정이 성공적으로 완료되었습니다.");
    }

    @DeleteMapping("/{reviewId}")
    public ResponseDto<Void> deleteReview(@PathVariable Integer classId, @PathVariable Integer reviewId) {
        reviewService.deleteReview(classId, reviewId);
        return ResponseDto.of(204, "리뷰 삭제가 성공적으로 완료되었습니다.");
    }

    @GetMapping
    public ResponseDto<ReviewPageResponse> getClassReviews(@PathVariable Integer classId,
                                                           @RequestParam int page) {
        PageRequest pageRequest = PageRequest.of(page - 1, 3);
        ReviewPageResponse reviews = reviewService.getClassReviews(classId, pageRequest);
        return ResponseDto.of(200, "리뷰 조회가 성공적으로 완료되었습니다.", reviews);
    }
}
