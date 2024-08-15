package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.dto.StepRequest;
import com.ssafy.ditto.domain.classes.service.StepService;
import com.ssafy.ditto.global.dto.ResponseDto;
import com.ssafy.ditto.global.dto.ResponseMessage;
import com.ssafy.ditto.global.error.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@Tag(name = "Step", description = "Class Step API")
@RestController
@RequestMapping("/classes/{classId}/steps")
@RequiredArgsConstructor
public class StepController {
    private final StepService stepService;

    @Operation(summary = "스텝 추가", description = "클래스에 새로운 스텝과 파일을 추가합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "스텝 정보와 파일이 성공적으로 추가되었습니다."),
            @ApiResponse(responseCode = "500", description = "파일 추가 중 오류가 발생했습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<String> addSteps(@PathVariable Integer classId,
                                        @RequestPart("stepRequests") List<StepRequest> stepRequests,
                                        @RequestPart("stepFiles") List<MultipartFile> stepFiles) {
        try {
            stepService.addSteps(classId, stepRequests, stepFiles);
            return ResponseDto.of(OK.value(), ResponseMessage.SUCCESS_WRITE.getMessage(), "스텝 정보와 파일이 성공적으로 추가되었습니다.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Operation(summary = "스텝 수정", description = "기존 스텝 정보와 파일을 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스텝 정보와 파일이 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "500", description = "파일 수정 중 오류가 발생했습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PatchMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<String> updateSteps(@PathVariable Integer classId,
                                           @RequestPart("stepRequests") List<StepRequest> stepRequests,
                                           @RequestPart("stepFiles") List<MultipartFile> stepFiles) {
        try {
            stepService.updateSteps(classId, stepRequests, stepFiles);
            return ResponseDto.of(OK.value(), ResponseMessage.SUCCESS_UPDATE.getMessage(), "스텝 정보와 파일이 성공적으로 수정되었습니다.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
