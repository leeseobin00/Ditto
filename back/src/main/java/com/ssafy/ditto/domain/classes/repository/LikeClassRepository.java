package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.LikeClass;
import com.ssafy.ditto.domain.user.domain.User;
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


    @Query(value =
            "SELECT c.* " +
                    "FROM Class c " +
                    "JOIN Like_Class lc ON c.class_id = lc.class_id " +
                    "WHERE lc.user_id = :userId " +
                    "AND lc.created_date < :dateTime " +
                    "ORDER BY lc.created_date DESC " +
                    "LIMIT 3",
            nativeQuery = true)
    List<DClass> getLikeClass(@Param("userId") int userId, @Param("dateTime") LocalDateTime dateTime);
}
