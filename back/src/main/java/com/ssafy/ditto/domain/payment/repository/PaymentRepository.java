package com.ssafy.ditto.domain.payment.repository;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.payment.domain.Payment;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    // 입력 날짜 이전의 결제 내역 5개 반환
    @Query(value = "SELECT * " +
            "FROM payment p " +
            "WHERE p.user_id = :userId AND p.pay_time < :dateTime " +
            "ORDER BY p.pay_time DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Payment> getPaymentList(@Param("userId") Integer userId, @Param("dateTime") LocalDateTime dateTime);

    Payment findByUserAndLecture(User user, Lecture lecture);

    Optional<Payment> findByUser_UserIdAndLecture_LectureId(Integer userId, Integer lectureId);
}
