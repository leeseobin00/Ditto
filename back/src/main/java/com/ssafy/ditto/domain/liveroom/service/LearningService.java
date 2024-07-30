package com.ssafy.ditto.domain.liveroom.service;

public interface LearningService {
    boolean isValidUser(Integer userId, Integer lectureId);
    boolean isValidTeacher(Integer userId, Integer lectureId);
    void changeStatus(Integer lectureId);
}
