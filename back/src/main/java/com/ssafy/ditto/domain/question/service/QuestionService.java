package com.ssafy.ditto.domain.question.service;

import com.ssafy.ditto.domain.question.dto.QuestionPageResponse;
import com.ssafy.ditto.domain.question.dto.QuestionRequest;
import org.springframework.data.domain.Pageable;

public interface QuestionService {
    void createQuestion(int classId, QuestionRequest questionRequest);

    void updateQuestion(Integer classId, Integer questionId, QuestionRequest questionRequest);

    void deleteQuestion(Integer classId, Integer questionId);

    QuestionPageResponse getClassQuestions(Integer classId, Pageable pageable);
}
