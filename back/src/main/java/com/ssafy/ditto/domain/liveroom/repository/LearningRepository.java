package com.ssafy.ditto.domain.liveroom.repository;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.liveroom.domain.Learning;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LearningRepository extends JpaRepository<Learning, Integer>, JpaSpecificationExecutor<Learning> {
    @Query("SELECT COUNT(l) FROM Learning l WHERE l.lecture.lectureId = :lectureId")
    int countByLectureId(@Param("lectureId") Integer lectureId);

    boolean existsByStudentAndLecture(User student, Lecture lecture);

    List<Learning> findAllByLecture(Lecture lecture);
}
