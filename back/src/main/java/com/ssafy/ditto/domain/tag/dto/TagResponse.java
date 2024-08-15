package com.ssafy.ditto.domain.tag.dto;

import com.ssafy.ditto.domain.tag.domain.Tag;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TagResponse {

    @Schema(description = "태그 ID", example = "1")
    private Integer tagId;

    @Schema(description = "태그 이름", example = "Java")
    private String tagName;

    @Schema(description = "카테고리 ID", example = "1")
    private Integer categoryId;

    public static TagResponse of(Tag tag) {
        return TagResponse.builder()
                .tagId(tag.getTagId())
                .tagName(tag.getTagName())
                .categoryId(tag.getCategory().getCategoryId())
                .build();
    }
}
