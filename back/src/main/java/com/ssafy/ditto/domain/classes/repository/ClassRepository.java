package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.DClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<DClass, Integer> {
}
