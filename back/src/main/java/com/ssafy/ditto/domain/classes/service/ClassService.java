package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.dto.ClassRequest;

public interface ClassService {
    void createClass(ClassRequest classRequest);
    void updateClass(Integer classId, ClassRequest classRequest);
}
