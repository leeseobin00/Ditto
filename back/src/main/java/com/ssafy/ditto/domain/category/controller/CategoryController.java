package com.ssafy.ditto.domain.category.controller;

import com.ssafy.ditto.domain.category.dto.CategoryResponse;
import com.ssafy.ditto.domain.category.service.CategoryService;
import com.ssafy.ditto.global.dto.ResponseDto;
import com.ssafy.ditto.global.error.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.ssafy.ditto.global.dto.ResponseMessage.SUCCESS_FETCH;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@Tag(name = "Category", description = "Category API")
public class CategoryController {
    private final CategoryService categoryService;

    @Operation(summary = "카테고리 조회", description = "카테고리를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "카테고리가 성공적으로 조회되었습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "카테고리를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping
    public ResponseDto<List<CategoryResponse>> getAllCategories() {
        List<CategoryResponse> categories = categoryService.getAllCategories();
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), categories);
    }
}
