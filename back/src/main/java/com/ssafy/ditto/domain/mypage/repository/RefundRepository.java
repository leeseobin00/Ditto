package com.ssafy.ditto.domain.mypage.repository;

import com.ssafy.ditto.domain.mypage.domain.Refund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefundRepository extends JpaRepository<Refund, Integer> {
    Refund findByRefundId(int refundId);
}
