package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.LikeClass;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LikeClassRepository extends JpaRepository<LikeClass, Integer> {
    @Query("SELECT lc FROM LikeClass lc WHERE lc.user = :user AND lc.dClass = :dClass")
    Optional<LikeClass> findByUserAndDClass(User user,DClass dClass);

    // 좋아요 추가
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Like_Class (class_id, user_id, created_date) VALUES (:classId, :userId, now())", nativeQuery = true)
    void addLike(@Param("userId") int userId ,@Param("classId") int classId);

    // 좋아요 삭제
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Like_Class WHERE class_id = :classId AND user_id = :userId", nativeQuery = true)
    void removeLike(@Param("userId") int userId ,@Param("classId") int classId);


//    @Query(value =
//            "SELECT new DClass(c.classId, c.className, c.classPrice, c.classHour, c.classMinute, c.classExplanation, c.classMin, c.classMax, c.studentSum, c.likeCount, c.reviewCount, c.ratingSum, c.isDeleted, c.userId, c.tagId, c.categoryId, c.kitId, c.fileId) " +
//                    "FROM DClass c " +
//                    "JOIN Like_Class lc ON c.class_id = lc.class_id " +
//                    "WHERE lc.user_id = :userId " +
//                    "AND lc.created_date < :dateTime " +
//                    "ORDER BY lc.created_date DESC " +
//                    "LIMIT 3",
//            nativeQuery = true)
//    Page<DClass> getLikeClass(@Param("userId") int userId, @Param("dateTime") LocalDateTime dateTime, Pageable pageable);


    @EntityGraph(attributePaths = {"dClass"})
    @Query("SELECT lc.dClass FROM LikeClass lc WHERE lc.user.id = :userId AND lc.createdDate < :createdDate ORDER BY lc.createdDate DESC")
    Page<DClass> getLikeClass(@Param("userId") Integer userId, @Param("createdDate") LocalDateTime createdDate, Pageable pageable);

//    @Query(value =
//            "SELECT c.class_id, c.class_name, c.class_price, c.class_hour, c.class_minute, c.class_explanation, c.class_min, c.class_max, c.student_sum, c.like_count, c.review_count, c.rating_sum, c.is_deleted, c.user_id, c.tag_id, c.category_id, c.kit_id, c.file_id " +
//                    "FROM Like_Class lc " +
//                    "JOIN DClass c ON lc.class_id = c.class_id " +
//                    "WHERE lc.user_id = :userId " +
//                    "AND lc.created_date < :dateTime " +
//                    "ORDER BY lc.created_date DESC " +
//                    "LIMIT 3",
//            nativeQuery = true)
//    List<DClass> getLikeClass(@Param("userId") int userId, @Param("dateTime") LocalDateTime dateTime);
}
