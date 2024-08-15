package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.dto.*;

import java.util.List;

public interface ClassService {
    Integer createClass(ClassRequest classRequest, Integer classFileId, Integer kitFileId);

    void updateClass(Integer classId, ClassRequest classRequest, Integer classFileId, Integer kitFileId);

    void deleteClass(Integer classId);

    ClassDetailResponse getClassDetail(Integer classId);

    ClassListResponse getClassList(ClassListRequest request);

    List<ClassResponse> getPopularClasses();

    List<ClassResponse> getLatestClasses();
}
