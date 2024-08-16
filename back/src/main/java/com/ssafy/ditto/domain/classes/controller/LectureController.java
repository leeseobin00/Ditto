package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.dto.LectureRequest;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;
import com.ssafy.ditto.domain.classes.service.LectureService;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@Tag(name = "Lecture", description = "Lecture API")
@RestController
@RequestMapping("/classes/{classId}/lectures")
@RequiredArgsConstructor
public class LectureController {
    private final LectureService lectureService;

    @Operation(summary = "강의 목록 조회", description = "클래스의 강의 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "클래스의 강의 목록 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping
    public ResponseDto<List<LectureResponse>> getLecturesByClassId(@PathVariable Integer classId) {
        List<LectureResponse> lectureList = lectureService.getUpcomingLecturesByClassId(classId);
        return ResponseDto.of(OK.value(), ResponseMessage.SUCCESS_FETCH.getMessage(), lectureList);
    }

    @Operation(summary = "강의 생성", description = "클래스에 새로운 강의를 추가합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "차시가 성공적으로 추가되었습니다."),
            @ApiResponse(responseCode = "404", description = "클래스 또는 사용자를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping
    public ResponseDto<String> createLecture(@PathVariable Integer classId, @RequestBody LectureRequest lectureRequest) {
        lectureService.createLecture(classId, lectureRequest);
        return ResponseDto.of(OK.value(), ResponseMessage.SUCCESS_WRITE.getMessage(), "차시가 성공적으로 추가되었습니다.");
    }

    @Operation(summary = "강의 수정", description = "기존 강의를 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "차시가 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "404", description = "클래스 또는 차시를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PatchMapping("/{lectureId}")
    public ResponseDto<String> updateLecture(@PathVariable Integer classId, @PathVariable Integer lectureId, @RequestBody LectureRequest lectureRequest) {
        lectureService.updateLecture(classId, lectureId, lectureRequest);
        return ResponseDto.of(OK.value(), ResponseMessage.SUCCESS_UPDATE.getMessage(), "차시가 성공적으로 수정되었습니다.");
    }

    @Operation(summary = "강의 삭제", description = "기존 강의를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "차시가 성공적으로 삭제되었습니다."),
            @ApiResponse(responseCode = "404", description = "클래스 또는 차시를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @DeleteMapping("/{lectureId}")
    public ResponseDto<String> deleteLecture(@PathVariable Integer classId, @PathVariable Integer lectureId) {
        lectureService.deleteLecture(classId, lectureId);
        return ResponseDto.of(OK.value(), ResponseMessage.SUCCESS_DELETE.getMessage(), "차시가 성공적으로 삭제되었습니다.");
    }

    @Operation(summary = "차시 리뷰 작성 여부 조회", description = "특정 차시에 대해 사용자가 리뷰를 작성했는지 확인합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "리뷰 작성 여부 조회가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "차시 또는 사용자를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @GetMapping("/{lectureId}/review/completed")
    public ResponseDto<Boolean> checkReviewCompletion(@PathVariable Integer classId, @PathVariable Integer lectureId, @RequestParam Integer userId) {
        return ResponseDto.of(OK.value(), ResponseMessage.SUCCESS_FETCH.getMessage(), lectureService.checkReviewCompleted(classId, lectureId, userId));
    }

    @Operation(summary = "차시 결제 여부 조회", description = "특정 차시에 대해 사용자가 결제를 완료했는지 확인합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "결제 여부 조회가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "차시 또는 사용자를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @GetMapping("/{lectureId}/payment/completed")
    public ResponseDto<Boolean> checkPaymentCompletion(@PathVariable Integer classId, @PathVariable Integer lectureId, @RequestParam Integer userId) {
        return ResponseDto.of(OK.value(), ResponseMessage.SUCCESS_FETCH.getMessage(), lectureService.checkPaymentCompleted(classId, lectureId, userId));
    }
}
