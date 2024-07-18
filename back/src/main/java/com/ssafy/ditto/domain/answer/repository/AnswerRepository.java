package com.ssafy.ditto.domain.answer.repository;

import com.ssafy.ditto.domain.answer.domain.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
}
