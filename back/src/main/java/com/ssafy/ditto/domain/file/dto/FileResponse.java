package com.ssafy.ditto.domain.file.dto;

import com.ssafy.ditto.domain.file.domain.File;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Builder
public class FileResponse {
    private Integer fileId;
    private String uploadFileName;
    private String fileUrl;

    public FileResponse(Integer fileId, String uploadFileName, String fileUrl){
        this.fileId=fileId;
        this.uploadFileName=uploadFileName;
        this.fileUrl=fileUrl;
    }

    public static FileResponse of(File file){
        return new FileResponse(
                file.getFileId(),
                file.getUploadFileName(),
                file.getFileUrl()
        );
    }
}
