package com.ssafy.ditto.domain.tag.dto;

import com.ssafy.ditto.domain.tag.domain.Tag;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TagResponse {
    private Integer tagId;
    private String tagName;
    private Integer categoryId;

    public static TagResponse of(Tag tag) {
        return TagResponse.builder()
                .tagId(tag.getTagId())
                .tagName(tag.getTagName())
                .categoryId(tag.getCategory().getCategoryId())
                .build();
    }
}
