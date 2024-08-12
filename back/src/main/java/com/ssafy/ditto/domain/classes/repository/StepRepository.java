package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.Step;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StepRepository extends JpaRepository<Step, Integer> {
}
