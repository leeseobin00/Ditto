package com.ssafy.ditto.domain.classes.service;

public interface LikeClassService {
    boolean checkLikeStatus(Integer userId, Integer classId);

    void likeClass(Integer classId, Integer userId);
}
