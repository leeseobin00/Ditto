package com.ssafy.ditto.domain.review.service;

import com.ssafy.ditto.domain.review.dto.ReviewRequest;

public interface ReviewService {
    void createReview(int classId, ReviewRequest reviewRequest);

    void updateReview(int classId, int reviewId, ReviewRequest reviewRequest);

    void deleteReview(int classId, int reviewId);
}
