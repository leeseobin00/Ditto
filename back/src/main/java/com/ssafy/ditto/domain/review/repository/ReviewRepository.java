package com.ssafy.ditto.domain.review.repository;

import com.ssafy.ditto.domain.review.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query(value = "SELECT * " +
            "FROM Review r " +
            "WHERE r.user_id = :userId AND r.createdDate < :dateTime AND r.is_deleted = false " +
            "ORDER BY r.createdDate DESC " +
            "LIMIT 3", nativeQuery = true)
    List<Review> getReviews(@Param("userId") int userId, @Param("dateTime") LocalDateTime dateTime);
}
