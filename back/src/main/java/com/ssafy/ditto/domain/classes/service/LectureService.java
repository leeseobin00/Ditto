package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.dto.LectureRequest;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;

import java.util.List;

public interface LectureService {
    void createLecture(Integer classId, LectureRequest lectureRequest);
    void updateLecture(Integer classId, Integer lectureId, LectureRequest lectureRequest);
    void deleteLecture(Integer classId, Integer lectureId);
    List<LectureResponse> getLecturesByClassId(Integer classId);
}
