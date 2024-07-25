package com.ssafy.ditto.domain.question.repository;

import com.ssafy.ditto.domain.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    // 입력 날짜 이전의 결제 내역 3개 반환
    @Query(value = "SELECT * " +
            "FROM Question q " +
            "WHERE q.user_id = :userId AND q.createdDate < :dateTime AND q.is_deleted = false " +
            "ORDER BY q.createdDate DESC " +
            "LIMIT 3", nativeQuery = true)
    List<Question> getQuestions(@Param("userId") int userId, @Param("dateTime") LocalDateTime dateTime);

    Question findByQuestionId(int questionId);
}
