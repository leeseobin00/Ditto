package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.Payment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    // 입력 날짜 이전의 결제 내역 5개 반환
    @Query(value = "SELECT * " +
            "FROM Payment p " +
            "WHERE p.user_id = :userId AND p.pay_time < :dateTime " +
            "ORDER BY p.pay_time DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Payment> getPaymentList(@Param("userId") int userId, @Param("dateTime") LocalDateTime dateTime);
}
