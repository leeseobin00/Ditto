package com.ssafy.ditto.domain.review.repository;

import com.ssafy.ditto.domain.review.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
