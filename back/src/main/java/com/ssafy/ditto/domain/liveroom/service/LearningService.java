package com.ssafy.ditto.domain.liveroom.service;

import com.ssafy.ditto.domain.liveroom.dto.LearningPageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LearningService {
    boolean isValidUser(Integer userId, Integer lectureId);
    void changeStatus(Integer lectureId);

    LearningPageResponse getStudentLearning(Integer userId, Pageable pageable);
    LearningPageResponse getTeacherLearning(Integer userId, Pageable pageable);

    void addStudent(Integer userId, Integer lectureId);
    void deleteStudent(Integer userId, Integer lectureId);

    List<Integer> getStudentList(Integer lectureId);
}
