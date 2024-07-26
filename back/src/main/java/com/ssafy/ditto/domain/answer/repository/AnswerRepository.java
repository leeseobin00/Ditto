package com.ssafy.ditto.domain.answer.repository;

import com.ssafy.ditto.domain.answer.domain.Answer;
import com.ssafy.ditto.domain.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    Answer findByAnswerId(Integer answerId);
    Answer findByQuestionId(Question questionId);
}
