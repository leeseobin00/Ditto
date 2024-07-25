package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.domain.Summary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SummaryRepository extends JpaRepository<Summary, Integer> {
    List<Summary> findAllByLectureId(Lecture byLectureId);
}
