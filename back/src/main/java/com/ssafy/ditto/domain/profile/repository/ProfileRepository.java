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

    @Query("SELECT DISTINCT u FROM User u " +
            "LEFT JOIN u.roleId r " +
            "LEFT JOIN u.userTags ut " +
            "LEFT JOIN ut.tagId t " +
            "LEFT JOIN t.categoryId c " +
            "WHERE (:categoryId IS NULL OR c.categoryId = :categoryId) " +
            "AND (:tagId IS NULL OR t.tagId = :tagId) " +
            "AND (:role IS NULL OR r.roleId = :role) " +
            "AND (:keyword IS NULL OR u.nickname LIKE %:keyword%) " +
            "AND u.isDeleted = false")
    List<User> findUsers(@Param("categoryId") Integer categoryId,
                         @Param("tagId") Integer tagId,
                         @Param("role") Integer role,
                         @Param("keyword") String keyword);


    @Query("SELECT COUNT(lu) FROM Like_User lu WHERE lu.likeGetterId = :userId")
    int countLikesByUserId(@Param("userId") int userId);

    @Query("SELECT SUM(c.studentSum) FROM Class c WHERE c.userId = :userId")
    Integer getTotalStudentSumByUserId(@Param("userId") int userId);

    @Query("SELECT SUM(c.ratingSum) FROM Class c WHERE c.userId = :userId")
    Integer getTotalRatingSumByUserId(@Param("userId") int userId);

    @Query("SELECT SUM(c.reviewCount) FROM Class c WHERE c.userId = :userId")
    Integer getTotalReviewCountByUserId(@Param("userId") int userId);


    // 좋아요 추가
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Like_Post (post_id, user_id, created_date) VALUES (:postId, :userId, now())", nativeQuery = true)
    void addLike(@Param("postId") int postId, @Param("userId") int userId);

    // 좋아요 삭제
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Like_Post WHERE post_id = :postId AND user_id = :userId", nativeQuery = true)
    void removeLike(@Param("postId") int postId, @Param("userId") int userId);

    // 좋아요 상태 확인
    @Query(value = "SELECT COUNT(*) FROM Like_Post WHERE post_id = :postId AND user_id = :userId", nativeQuery = true)
    int checkLike(@Param("postId") int postId, @Param("userId") int userId);
}
