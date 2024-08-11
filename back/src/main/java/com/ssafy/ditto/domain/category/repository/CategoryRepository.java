package com.ssafy.ditto.domain.category.repository;

import com.ssafy.ditto.domain.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
