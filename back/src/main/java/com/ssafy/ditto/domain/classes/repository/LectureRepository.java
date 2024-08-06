package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Integer> {
    Lecture findByLectureId(int lectureId);

    List<Lecture> findAllByClassId(DClass classId);

    @Query("SELECT l FROM Lecture l WHERE l.classId = :classId AND l.isDeleted = false")
    List<Lecture> findAllByClassIdAndIsDeletedFalse(DClass classId);

    boolean existsByClassId_UserIdAndLectureId(User user, Integer lectureId);

    @Query("SELECT l FROM Lecture l WHERE l.classId.classId = :classId AND l.lectureId NOT IN " +
            "(SELECT r.lecture.lectureId FROM Review r WHERE r.user.userId = :userId AND r.dclass.classId = :classId) " +
            "AND l.isDeleted = false")
    List<Lecture> findLecturesWithoutReviews(@Param("classId") Integer classId, @Param("userId") Integer userId);

    @Query("SELECT l FROM Learning l where l.dClass.classId = :classId AND l.student.userId = :userId AND l.isFinished")
    List<Lecture> findCompletedLearningsByClassAndUser(@Param("classId") Integer classId, @Param("userId") Integer userId);
}
