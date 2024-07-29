package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.Learning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LearningRepository extends JpaRepository<Learning, Integer>, JpaSpecificationExecutor<Learning> {
}
