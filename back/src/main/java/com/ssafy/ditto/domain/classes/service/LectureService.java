package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.dto.LectureRequest;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;

import java.time.LocalDate;
import java.util.List;

public interface LectureService {
    void createLecture(Integer classId, LectureRequest lectureRequest);

    void updateLecture(Integer classId, Integer lectureId, LectureRequest lectureRequest);

    void deleteLecture(Integer classId, Integer lectureId);

    List<LectureResponse> getUpcomingLecturesByClassId(Integer classId);

    boolean isValidTeacher(Integer userId, int lectureId);

    List<Lecture> getLecturesForDate(LocalDate date);

    List<LectureResponse> getCompletedLecturesWithoutReviews(Integer classId, Integer userId);

    List<LectureResponse> getLecturesWithoutReviews(Integer classId, Integer userId);

    Boolean checkReviewCompleted(Integer classId, Integer lectureId, Integer userId);

    Boolean checkPaymentCompleted(Integer classId, Integer lectureId, Integer userId);
}

