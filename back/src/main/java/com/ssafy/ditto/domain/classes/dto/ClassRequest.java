package com.ssafy.ditto.domain.classes.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassRequest {
    private String className;
    private Integer userId;
    private Integer categoryId;
    private Integer tagId;

    // FK
    private String thumbnailUrl;

    private Integer classPrice;
    private Integer classHour;
    private Integer classMinute;
    private Integer classMin;
    private Integer classMax;
    private String classExplanation;

    private KitRequest kit;
    private List<StepRequest> steps;
}
