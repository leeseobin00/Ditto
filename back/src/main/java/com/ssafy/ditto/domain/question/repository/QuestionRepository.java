package com.ssafy.ditto.domain.question.repository;

import com.ssafy.ditto.domain.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
}
