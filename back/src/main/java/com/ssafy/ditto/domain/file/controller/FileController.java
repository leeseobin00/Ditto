package com.ssafy.ditto.domain.file.controller;

import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.file.service.FileService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;

import static com.ssafy.ditto.global.dto.ResponseMessage.SUCCESS;
import static com.ssafy.ditto.global.dto.ResponseMessage.SUCCESS_WRITE;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {
    private final FileService fileService;

    // 기본 프로필 업로드용 더미 API
    @PostMapping
    public ResponseDto<String> uploadImage(@RequestPart("file") MultipartFile file) {
        try {
            fileService.saveFile(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseDto.of(OK.value(), SUCCESS.getMessage(), "파일 등록 성공");
    }

    @GetMapping("/{fileId}")
    public ResponseDto<FileResponse> getFile(@PathVariable int fileId) {
        FileResponse fileResponse = fileService.getFile(fileId);
        return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(), fileResponse);
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable int fileId) throws MalformedURLException {
        FileResponse fileResponse = fileService.getFile(fileId);

        String saveFileName = fileResponse.getFileUrl(); // 저장된 파일 경로를 가져옵니다.
        String originalFileName = fileResponse.getUploadFileName(); // 원본 파일명을 가져옵니다.

        UrlResource resource = new UrlResource("file:" + saveFileName);

        String encodedOriginalFileName = UriUtils.encode(originalFileName, StandardCharsets.UTF_8);
        String contentDisposition = "attachment; filename=\"" + encodedOriginalFileName + "\"";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .body(resource);
    }
}
