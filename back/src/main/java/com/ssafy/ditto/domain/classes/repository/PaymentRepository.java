package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.Payment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Query("SELECT e FROM MyEntity e ORDER BY e.createdAt DESC")
    List<Payment> findTop5ByOrderByCreatedAtDesc(Pageable pageable);

    @Query("SELECT e FROM MyEntity e WHERE e.createdAt < :createdAt ORDER BY e.createdAt DESC")
    List<Payment> findPrevious5ByCreatedAtBefore(LocalDateTime createdAt, Pageable pageable);
}
