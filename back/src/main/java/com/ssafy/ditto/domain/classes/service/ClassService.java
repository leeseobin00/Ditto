package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.dto.ClassDetailResponse;
import com.ssafy.ditto.domain.classes.dto.ClassListRequest;
import com.ssafy.ditto.domain.classes.dto.ClassListResponse;
import com.ssafy.ditto.domain.classes.dto.ClassRequest;

public interface ClassService {
    void createClass(ClassRequest classRequest, Integer classFileId, Integer kitFileId);

    void updateClass(Integer classId, ClassRequest classRequest, Integer classFileId, Integer kitFileId);

    void deleteClass(Integer classId);

    ClassDetailResponse getClassDetail(Integer classId);

    ClassListResponse getClassList(ClassListRequest request);
}
