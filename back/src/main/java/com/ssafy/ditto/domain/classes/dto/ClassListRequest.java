package com.ssafy.ditto.domain.classes.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassListRequest {

    @Schema(description = "페이지 번호", example = "1")
    private Integer page;

    @Schema(description = "카테고리 ID", example = "2")
    private Integer categoryId;

    @Schema(description = "태그 ID", example = "3")
    private Integer tagId;

    @Schema(description = "검색 기준 (nickname or className)", example = "className")
    private String searchBy;

    @Schema(description = "검색 키워드", example = "Spring")
    private String keyword;

    @Schema(description = "정렬 기준 (likeCount, averageRating, reviewCount, priceLow, createdDate)", example = "createdDate")
    private String sortBy;

    @Schema(description = "페이지 크기", example = "10")
    private Integer size;
}
