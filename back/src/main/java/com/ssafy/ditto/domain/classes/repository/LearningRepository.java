package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.Learning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LearningRepository extends JpaRepository<Learning, Integer>, JpaSpecificationExecutor<Learning> {
    @Query("SELECT COUNT(l) FROM Learning l WHERE l.lectureId.id = :lectureId")
    int countByLectureId(@Param("lectureId") Integer lectureId);
}
