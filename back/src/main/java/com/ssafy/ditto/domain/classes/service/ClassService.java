package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.dto.ClassRequest;

public interface ClassService {
    void createClass(ClassRequest classRequest, Integer fileId);
    void updateClass(Integer classId, ClassRequest classRequest, Integer fileId);
    void deleteClass(Integer classId);
}
