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
    Optional<LikeClass> findByUserAndDClass(@Param("user") User user, @Param("dClass") DClass dClass);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Like_Class (class_id, user_id, created_date) VALUES (:classId, :userId, now())", nativeQuery = true)
    void addLike(@Param("userId") int userId ,@Param("classId") int classId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Like_Class WHERE class_id = :classId AND user_id = :userId", nativeQuery = true)
    void removeLike(@Param("userId") int userId ,@Param("classId") int classId);

    @EntityGraph(attributePaths = {"dClass"})
    @Query("SELECT lc.dClass FROM LikeClass lc WHERE lc.user.userId = :userId AND lc.createdDate < :createdDate ORDER BY lc.createdDate DESC")
    Page<DClass> getLikeClass(@Param("userId") Integer userId, @Param("createdDate") LocalDateTime createdDate, Pageable pageable);
}
