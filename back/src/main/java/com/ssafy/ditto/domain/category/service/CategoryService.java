package com.ssafy.ditto.domain.category.service;

import com.ssafy.ditto.domain.category.dto.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
}
