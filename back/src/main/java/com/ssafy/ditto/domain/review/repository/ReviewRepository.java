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

public interface ReviewRepository extends JpaRepository<Review, Integer>, JpaSpecificationExecutor<Review> {
    @Query(value = "SELECT * " +
            "FROM Review r " +
            "WHERE r.user_id = :userId AND r.created_date < :dateTime AND r.is_deleted = false " +
            "ORDER BY r.created_date DESC " +
            "LIMIT 3", nativeQuery = true)
    List<Review> getReviews(@Param("userId") int userId, @Param("dateTime") LocalDateTime dateTime);

    @Query("SELECT r FROM Review r WHERE r.dclass = :classId AND r.isDeleted = false")
    Page<Review> findByDclass(@Param("classId") DClass classId, Pageable pageable);
}
