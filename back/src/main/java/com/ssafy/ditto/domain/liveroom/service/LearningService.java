package com.ssafy.ditto.domain.liveroom.service;

import com.ssafy.ditto.domain.liveroom.dto.LearningPageResponse;
import org.springframework.data.domain.Pageable;

public interface LearningService {
    boolean isValidUser(Integer userId, Integer lectureId);
    void changeStatus(Integer lectureId);

    LearningPageResponse getStudentLearning(Integer userId, Pageable pageable);
    LearningPageResponse getTeacherLearning(Integer userId, Pageable pageable);
}
