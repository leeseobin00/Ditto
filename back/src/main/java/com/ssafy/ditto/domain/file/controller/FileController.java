package com.ssafy.ditto.domain.file.controller;

import com.ssafy.ditto.domain.file.service.FileService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
        return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(),"파일 등록 성공");
    }
}
