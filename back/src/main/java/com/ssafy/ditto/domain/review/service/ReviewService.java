package com.ssafy.ditto.domain.review.service;

import com.ssafy.ditto.domain.review.dto.ReviewPageResponse;
import com.ssafy.ditto.domain.review.dto.ReviewRequest;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    void createReview(int classId, ReviewRequest reviewRequest);

    void updateReview(int classId, int reviewId, ReviewRequest reviewRequest);

    void deleteReview(int classId, int reviewId);

    ReviewPageResponse getClassReviews(int classId, Pageable pageable);
}
