package com.ssafy.ditto.domain.answer.repository;

import com.ssafy.ditto.domain.answer.domain.Answer;
import com.ssafy.ditto.domain.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    Answer findByAnswerId(Integer answerId);

    @Query("SELECT a FROM Answer a WHERE a.question.questionId = :questionId")
    Answer findByQuestionId(@Param("questionId") Integer questionId);

    Optional<Answer> findByQuestion(Question question);
}
