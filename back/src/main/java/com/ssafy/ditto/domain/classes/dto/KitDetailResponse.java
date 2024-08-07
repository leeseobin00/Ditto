package com.ssafy.ditto.domain.classes.dto;

import com.ssafy.ditto.domain.classes.domain.Kit;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KitDetailResponse {

    @Schema(description = "키트 ID", example = "1")
    private Integer kitId;

    @Schema(description = "키트 이름", example = "즐거운 뜨개질 키트")
    private String kitName;

    @Schema(description = "키트 설명", example = "즐거운 뜨개질 학습에 필요한 키트입니다.")
    private String kitExplanation;

    @Schema(description = "파일 정보")
    private FileResponse file;

    public static KitDetailResponse of(Kit kit, FileResponse fileResponse) {
        return KitDetailResponse.builder()
                .kitId(kit.getKitId())
                .kitName(kit.getKitName())
                .kitExplanation(kit.getKitExplanation())
                .file(fileResponse)
                .build();
    }
}
