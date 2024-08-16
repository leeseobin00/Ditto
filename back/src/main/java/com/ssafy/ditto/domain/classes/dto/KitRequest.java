package com.ssafy.ditto.domain.classes.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KitRequest {

    @Schema(description = "키트 이름", example = "즐거운 뜨개질 키트")
    private String kitName;

    @Schema(description = "키트 설명", example = "즐거운 뜨개질 학습에 필요한 키트입니다.")
    private String kitExplanation;
}
