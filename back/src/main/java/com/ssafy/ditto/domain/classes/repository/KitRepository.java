package com.ssafy.ditto.domain.classes.repository;

import com.ssafy.ditto.domain.classes.domain.Kit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KitRepository extends JpaRepository<Kit, Integer> {
}
