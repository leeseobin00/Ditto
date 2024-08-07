package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.service.LikeClassService;
import com.ssafy.ditto.global.dto.ResponseDto;
import com.ssafy.ditto.global.error.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.OK;

@Tag(name = "ClassLike", description = "Class Like API")
@RestController
@RequestMapping("/classes/{classId}/like")
@RequiredArgsConstructor
public class ClassLikeController {
    private final LikeClassService likeClassService;

    @Operation(summary = "클래스 좋아요 상태 조회", description = "클래스의 좋아요 상태를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "클래스 좋아요 상태 조회가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "사용자 또는 클래스를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping
    public ResponseDto<Boolean> checkLikeStatus(@PathVariable Integer classId, @RequestParam Integer userId) {
        boolean liked = likeClassService.checkLikeStatus(userId, classId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), liked);
    }

    @Operation(summary = "클래스 좋아요", description = "클래스에 좋아요를 추가합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "클래스 좋아요가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "사용자 또는 클래스를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping
    public ResponseDto<String> likeClass(@PathVariable Integer classId, @RequestBody Map<String, Integer> requestBody) {
        Integer userId = requestBody.get("userId");
        likeClassService.likeClass(classId, userId);
        return ResponseDto.of(OK.value(), SUCCESS_LIKE.getMessage(), "클래스 좋아요가 성공적으로 완료되었습니다.");
    }

    @Operation(summary = "클래스 좋아요 취소", description = "클래스의 좋아요를 취소합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "클래스 좋아요 취소가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "사용자 또는 클래스를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @DeleteMapping
    public ResponseDto<String> unlikeClass(@PathVariable Integer classId, @RequestBody Map<String, Integer> requestBody) {
        Integer userId = requestBody.get("userId");
        likeClassService.unlikeClass(classId, userId);
        return ResponseDto.of(OK.value(), SUCCESS_UNLIKE.getMessage(), "클래스 좋아요 취소가 성공적으로 완료되었습니다.");
    }
}
