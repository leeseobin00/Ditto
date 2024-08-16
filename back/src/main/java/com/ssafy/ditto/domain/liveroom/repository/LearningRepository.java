package com.ssafy.ditto.domain.liveroom.repository;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.liveroom.domain.Learning;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LearningRepository extends JpaRepository<Learning, Integer>, JpaSpecificationExecutor<Learning> {
    @Query("SELECT COUNT(l) FROM Learning l WHERE l.lecture.lectureId = :lectureId")
    int countByLectureId(@Param("lectureId") Integer lectureId);

    boolean existsByStudentAndLecture(User student, Lecture lecture);

    List<Learning> findAllByLecture(Lecture lecture);

    @Query("SELECT l FROM Learning l " +
            "JOIN FETCH l.dClass dc " +
            "JOIN FETCH l.lecture le " +
            "WHERE l.student = :student AND le.isFinished = false " +
            "ORDER BY le.year ASC, le.month ASC, le.day ASC, le.hour ASC, le.minute ASC")
    Page<Learning> findByStudent(@Param("student") User student, Pageable pageable);

    @Query("SELECT l FROM Learning l " +
            "JOIN FETCH l.dClass dc " +
            "JOIN FETCH l.lecture le " +
            "WHERE l.teacher = :teacher AND le.isFinished = false " +
            "ORDER BY le.year ASC, le.month ASC, le.day ASC, le.hour ASC, le.minute ASC")
    List<Learning> findByTeacher(@Param("teacher") User teacher);

    Optional<Learning> findByStudentAndLecture(User student, Lecture lecture);

    @Query("SELECT l.student.userId FROM Learning l WHERE l.lecture.lectureId = :lectureId")
    List<Integer> findStudentUserIdsByLectureId(@Param("lectureId") Integer lectureId);

    @Query("SELECT l FROM Learning l " +
            "JOIN FETCH l.dClass dc " +
            "JOIN FETCH l.lecture le " +
            "WHERE l.teacher = :teacher AND le.isFinished = false")
    List<Learning> findByTeacherAndLectureNotFinished(@Param("teacher") User teacher);

}
