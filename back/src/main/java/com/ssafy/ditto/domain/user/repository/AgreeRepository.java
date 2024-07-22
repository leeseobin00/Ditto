package com.ssafy.ditto.domain.user.repository;

import com.ssafy.ditto.domain.user.domain.Agree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgreeRepository extends JpaRepository<Agree, Integer> {
    Agree findByAgreeId(int agreeId);
}
