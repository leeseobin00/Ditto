package com.ssafy.ditto.domain.profile.repository;

import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<User,Integer> {

    @Query("SELECT u FROM User u " +
            "LEFT JOIN UserTag ut ON u.userId = ut.userId.userId " +
            "LEFT JOIN Tag t ON ut.tagId.tagId = t.tagId " +
            "WHERE (:categoryId IS NULL OR t.category.categoryId = :categoryId) " +
            "AND (:tagId IS NULL OR t.tagId = :tagId) " +
            "AND (u.roleId.roleId = :role) " +
            "AND (:keyword IS NULL OR u.nickname LIKE %:keyword%) " +
            "AND u.isDeleted = false")
    List<User> findUsers(@Param("categoryId") Integer categoryId,
                         @Param("tagId") Integer tagId,
                         @Param("role") Integer role,
                         @Param("keyword") String keyword);


    @Query("SELECT SUM(c.studentSum) FROM DClass c WHERE c.userId = :user AND c.isDeleted = false")
    Integer getTotalStudentSumByUserId(@Param("user") User user);

    @Query("SELECT SUM(c.ratingSum) FROM DClass c WHERE c.userId = :user AND c.isDeleted = false")
    Integer getTotalRatingSumByUserId(@Param("user") User user);

    @Query("SELECT SUM(c.reviewCount) FROM DClass c WHERE c.userId = :user AND c.isDeleted = false")
    Integer getTotalReviewCountByUserId(@Param("user") User user);


    // 좋아요 추가
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Like_User (like_getter_id, like_giver_id, created_date) VALUES (:likeGetterId, :likeGiverId, now())", nativeQuery = true)
    void addLike(@Param("likeGetterId") int likeGetterId, @Param("likeGiverId") int likeGiverId);

    // 좋아요 삭제
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Like_User WHERE like_getter_id = :likeGetterId AND like_giver_id = :likeGiverId", nativeQuery = true)
    void removeLike(@Param("likeGetterId") int likeGetterId, @Param("likeGiverId") int likeGiverId);

    // 좋아요 상태 확인
    @Query(value = "SELECT COUNT(*) FROM Like_User WHERE like_getter_id = :likeGetterId AND like_giver_id = :likeGiverId", nativeQuery = true)
    int checkLike(@Param("likeGetterId") int likeGetterId, @Param("likeGiverId") int likeGiverId);
}
