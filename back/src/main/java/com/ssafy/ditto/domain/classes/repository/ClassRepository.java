package com.ssafy.ditto.domain.classes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.ditto.domain.classes.domain.Class;

public interface ClassRepository extends JpaRepository<Class, Integer> {
}
