package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Integer> {
    List<Lecture> findAllByClassId(DClass classId);

    @Query("SELECT l FROM Lecture l WHERE l.classId = :classId AND l.isDeleted = false")
    List<Lecture> findAllByClassIdAndIsDeletedFalse(DClass classId);
}
