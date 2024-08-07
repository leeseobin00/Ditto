package com.ssafy.ditto.domain.category.dto;

import com.ssafy.ditto.domain.category.domain.Category;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {

    @Schema(description = "카테고리 ID", example = "1")
    private Integer categoryId;

    @Schema(description = "카테고리 이름", example = "프로그래밍")
    private String categoryName;

    public static CategoryResponse of(Category category) {
        return CategoryResponse.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .build();
    }
}