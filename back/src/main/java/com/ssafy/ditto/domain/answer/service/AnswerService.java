package com.ssafy.ditto.domain.answer.service;

import com.ssafy.ditto.domain.answer.dto.AnswerRequest;
import com.ssafy.ditto.domain.answer.dto.AnswerResponse;

public interface AnswerService {
    void createAnswer(Integer questionId, AnswerRequest answerRequest);

    void updateAnswer(Integer answerId, AnswerRequest answerRequest);

    void deleteAnswer(Integer answerId);

    AnswerResponse getAnswer(Integer questionId);
}
