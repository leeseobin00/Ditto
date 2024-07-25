package com.ssafy.ditto.domain.classes.dto;

import com.ssafy.ditto.domain.classes.domain.Kit;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KitDetailResponse {
    private Integer kitId;
    private String kitName;
    private String kitExplanation;
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
