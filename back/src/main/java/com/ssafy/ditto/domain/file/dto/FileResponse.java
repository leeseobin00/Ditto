package com.ssafy.ditto.domain.file.dto;

import com.ssafy.ditto.domain.file.domain.File;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Builder
public class FileResponse {

    @Schema(description = "파일 ID", example = "1")
    private Integer fileId;

    @Schema(description = "업로드된 파일 이름", example = "file_image.png")
    private String uploadFileName;

    @Schema(description = "파일 URL", example = "var/image/file_image.png")
    private String fileUrl;

    public FileResponse(Integer fileId, String uploadFileName, String fileUrl) {
        this.fileId = fileId;
        this.uploadFileName = uploadFileName;
        this.fileUrl = fileUrl;
    }

    public static FileResponse of(File file) {
        return new FileResponse(
                file.getFileId(),
                file.getUploadFileName(),
                file.getFileUrl()
        );
    }
}
