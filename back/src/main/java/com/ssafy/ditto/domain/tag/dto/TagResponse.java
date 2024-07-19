package com.ssafy.ditto.domain.tag.dto;

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
}
