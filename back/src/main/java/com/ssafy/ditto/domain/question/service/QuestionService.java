package com.ssafy.ditto.domain.question.service;

import com.ssafy.ditto.domain.question.dto.QuestionRequest;

public interface QuestionService {
    void createQuestion(int classId, QuestionRequest questionRequest);
}
