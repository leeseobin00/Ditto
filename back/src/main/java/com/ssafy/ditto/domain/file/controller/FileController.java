package com.ssafy.ditto.domain.file.controller;

import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.file.service.FileService;
import com.ssafy.ditto.global.dto.ResponseDto;
import com.ssafy.ditto.global.error.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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

@Tag(name = "File", description = "File API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {
    private final FileService fileService;

    @Operation(summary = "파일 업로드", description = "파일을 업로드합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "파일이 성공적으로 업로드되었습니다."),
            @ApiResponse(responseCode = "500", description = "파일 업로드 중 오류가 발생했습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping
    public ResponseDto<String> uploadImage(@RequestPart("file") MultipartFile file) {
        try {
            fileService.saveFile(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseDto.of(OK.value(), SUCCESS.getMessage(), "파일 등록 성공");
    }

    @Operation(summary = "파일 조회", description = "파일을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "파일 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping("/{fileId}")
    public ResponseDto<FileResponse> getFile(@PathVariable int fileId) {
        FileResponse fileResponse = fileService.getFile(fileId);
        return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(), fileResponse);
    }

    @Operation(summary = "파일 다운로드", description = "파일을 다운로드합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "파일 다운로드가 성공적으로 완료되었습니다.")
    })
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
