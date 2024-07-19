package com.ssafy.ditto.domain.category.controller;

import com.ssafy.ditto.domain.category.dto.CategoryResponse;
import com.ssafy.ditto.domain.category.service.CategoryService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseDto<List<CategoryResponse>> getAllCategories() {
        List<CategoryResponse> categories = categoryService.getAllCategories();
        return ResponseDto.of(200, "Success", categories);
    }
}
