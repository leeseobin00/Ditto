package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Integer> {
    Lecture findByLectureId(int lectureId);

    List<Lecture> findAllByDclass(DClass dclass);

    @Query("SELECT l FROM Lecture l WHERE l.dclass = :dclass AND l.isDeleted = false")
    List<Lecture> findAllByDclassAndIsDeletedFalse(@Param("dclass") DClass dclass);

    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM Lecture l WHERE l.dclass.user = :user AND l.lectureId = :lectureId")
    boolean existsByDclass_UserAndLectureId(@Param("user") User user, @Param("lectureId") Integer lectureId);

    @Query("SELECT l FROM Lecture l WHERE l.dclass.classId = :classId AND l.lectureId NOT IN " +
            "(SELECT r.lecture.lectureId FROM Review r WHERE r.user.userId = :userId AND r.dclass.classId = :classId) " +
            "AND l.isDeleted = false")
    List<Lecture> findLecturesWithoutReviews(@Param("classId") Integer classId, @Param("userId") Integer userId);

    // Corrected query to join with Learning entity
    @Query("SELECT l FROM Lecture l JOIN Learning ln ON l.lectureId = ln.lecture.lectureId WHERE ln.dclass.classId = :classId AND ln.student.userId = :userId AND ln.isFinished = true")
    List<Lecture> findCompletedLearningsByClassAndUser(@Param("classId") Integer classId, @Param("userId") Integer userId);

    @Query("SELECT l FROM Lecture l WHERE l.dclass = :dclass AND l.isDeleted = false AND " +
            "(l.year > :currentYear OR " +
            "(l.year = :currentYear AND l.month > :currentMonth) OR " +
            "(l.year = :currentYear AND l.month = :currentMonth AND l.day > :currentDay) OR " +
            "(l.year = :currentYear AND l.month = :currentMonth AND l.day = :currentDay AND l.hour > :currentHour) OR " +
            "(l.year = :currentYear AND l.month = :currentMonth AND l.day = :currentDay AND l.hour = :currentHour AND l.minute > :currentMinute)) " +
            "ORDER BY l.year, l.month, l.day, l.hour, l.minute ASC")
    List<Lecture> findUpcomingLecturesByDclass(@Param("dclass") DClass dclass,
                                               @Param("currentYear") Integer currentYear,
                                               @Param("currentMonth") Byte currentMonth,
                                               @Param("currentDay") Byte currentDay,
                                               @Param("currentHour") Byte currentHour,
                                               @Param("currentMinute") Byte currentMinute);

    List<Lecture> findByYearAndMonthAndDay(Integer year, Byte month, Byte day);

    @Query("SELECT l FROM Lecture l WHERE l.dclass.classId = :classId AND l.isDeleted = false AND l.lectureId NOT IN " +
            "(SELECT r.lecture.lectureId FROM Review r WHERE r.user.userId = :userId) AND EXISTS " +
            "(SELECT ln FROM Learning ln WHERE ln.lecture.lectureId = l.lectureId AND ln.student.userId = :userId AND ln.isFinished = true)")
    List<Lecture> findCompletedLecturesWithoutReviews(@Param("classId") Integer classId, @Param("userId") Integer userId);
}
