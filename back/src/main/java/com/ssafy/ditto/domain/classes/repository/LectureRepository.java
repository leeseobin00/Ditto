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

    List<Lecture> findAllByDClass(@Param("dClass") DClass dClass);

    @Query("SELECT l FROM Lecture l WHERE l.dClass = :dClass AND l.isDeleted = false")
    List<Lecture> findAllByDClassAndIsDeletedFalse(@Param("dClass") DClass dClass);

    boolean existsByDClass_UserAndLectureId(User user, Integer lectureId);

    @Query("SELECT l FROM Lecture l WHERE l.dClass.classId = :classId AND l.lectureId NOT IN " +
            "(SELECT r.lecture.lectureId FROM Review r WHERE r.user.userId = :userId AND r.dClass.classId = :classId) " +
            "AND l.isDeleted = false")
    List<Lecture> findLecturesWithoutReviews(@Param("classId") Integer classId, @Param("userId") Integer userId);

    @Query("SELECT l FROM Learning l WHERE l.dClass.classId = :classId AND l.student.userId = :userId AND l.isFinished")
    List<Lecture> findCompletedLearningsByClassAndUser(@Param("classId") Integer classId, @Param("userId") Integer userId);

    @Query("SELECT l FROM Lecture l WHERE l.dClass = :dClass AND l.isDeleted = false AND " +
            "(l.year > :currentYear OR " +
            "(l.year = :currentYear AND l.month > :currentMonth) OR " +
            "(l.year = :currentYear AND l.month = :currentMonth AND l.day > :currentDay) OR " +
            "(l.year = :currentYear AND l.month = :currentMonth AND l.day = :currentDay AND l.hour > :currentHour) OR " +
            "(l.year = :currentYear AND l.month = :currentMonth AND l.day = :currentDay AND l.hour = :currentHour AND l.minute > :currentMinute)) " +
            "ORDER BY l.year, l.month, l.day, l.hour, l.minute ASC")
    List<Lecture> findUpcomingLecturesByClassId(@Param("dClass") DClass dClass,
                                                @Param("currentYear") Integer currentYear,
                                                @Param("currentMonth") Byte currentMonth,
                                                @Param("currentDay") Byte currentDay,
                                                @Param("currentHour") Byte currentHour,
                                                @Param("currentMinute") Byte currentMinute);

    List<Lecture> findByYearAndMonthAndDay(Integer year, Byte month, Byte day);
}
