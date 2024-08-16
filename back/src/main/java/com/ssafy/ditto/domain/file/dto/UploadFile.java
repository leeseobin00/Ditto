package com.ssafy.ditto.domain.file.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UploadFile {

    @Schema(description = "파일 ID", example = "1")
    private Integer fileId;

    @Schema(description = "업로드된 파일 이름", example = "image.png")
    private String uploadFileName;

    @Schema(description = "저장된 파일 이름", example = "uuid-image.png")
    private String storeFileName;

    @Schema(description = "파일 크기", example = "1024")
    private Long fileSize;
}
