package com.ssafy.ditto.domain.file.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UploadFile {
    private Integer fileId;
    private String uploadFileName;
    private String storeFileName;
    private Long fileSize;
}
