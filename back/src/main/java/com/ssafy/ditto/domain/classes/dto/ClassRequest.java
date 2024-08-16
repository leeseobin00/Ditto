package com.ssafy.ditto.domain.classes.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassRequest {

    @Schema(description = "클래스 이름", example = "즐거운 뜨개질 강의")
    private String className;

    @Schema(description = "사용자 ID", example = "1")
    private Integer userId;

    @Schema(description = "카테고리 ID", example = "2")
    private Integer categoryId;

    @Schema(description = "태그 ID", example = "3")
    private Integer tagId;

    @Schema(description = "클래스 가격", example = "50000")
    private Integer classPrice;

    @Schema(description = "클래스 시간(시)", example = "1")
    private Integer classHour;

    @Schema(description = "클래스 시간(분)", example = "30")
    private Integer classMinute;

    @Schema(description = "최소 수강 인원", example = "5")
    private Integer classMin;

    @Schema(description = "최대 수강 인원", example = "20")
    private Integer classMax;

    @Schema(description = "클래스 설명", example = "Spring Boot를 이용한 웹 애플리케이션 개발 강의입니다.")
    private String classExplanation;

    @Schema(description = "키트 정보")
    private KitRequest kit;
}

