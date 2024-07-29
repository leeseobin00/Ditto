package com.ssafy.ditto.domain.review.repository;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.review.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> , JpaSpecificationExecutor<Review> {
    @Query(value = "SELECT * " +
            "FROM Review r " +
            "WHERE r.user_id = :userId AND r.createdDate < :dateTime AND r.is_deleted = false " +
            "ORDER BY r.createdDate DESC " +
            "LIMIT 3", nativeQuery = true)
    List<Review> getReviews(@Param("userId") int userId, @Param("dateTime") LocalDateTime dateTime);

    Page<Review> findByClassId(DClass classId, Pageable pageable);
}
