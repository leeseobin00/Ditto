package com.ssafy.ditto.domain.classes.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassListRequest {
    private Integer page;
    private Integer categoryId;
    private Integer tagId;
    private String searchBy;
    private String keyword;
    private String sortBy;
    private Integer size;
}