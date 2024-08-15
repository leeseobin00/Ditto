package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.dto.*;
import com.ssafy.ditto.domain.classes.service.ClassService;
import com.ssafy.ditto.domain.classes.service.LectureService;
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
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.*;

@Tag(name = "Class", description = "Class API")
@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor
public class ClassController {
    private final ClassService classService;
    private final LectureService lectureService;
    private final FileService fileService;

    @Operation(summary = "클래스 생성", description = "새로운 클래스를 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "클래스가 성공적으로 생성되었습니다."),
            @ApiResponse(responseCode = "500", description = "파일 업로드 중 오류가 발생했습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<?> createClass(@RequestPart("classRequest") ClassRequest classRequest,
                                      @RequestPart(value = "classFile", required = false) MultipartFile classFile,
                                      @RequestPart(value = "kitFile", required = false) MultipartFile kitFile) {
        Integer classId;
        try {
            Integer classFileId = null;
            Integer kitFileId = null;

            if (classFile != null) {
                classFileId = fileService.saveFile(classFile);
            }

            if (kitFile != null) {
                kitFileId = fileService.saveFile(kitFile);
            }

            classId = classService.createClass(classRequest, classFileId, kitFileId);
        } catch (IOException e) {
            return ResponseDto.of(500, "파일 업로드 중 오류가 발생했습니다.");
        }
        return ResponseDto.of(CREATED.value(), SUCCESS_WRITE.getMessage(), classId);
    }

    @Operation(summary = "클래스 수정", description = "기존 클래스를 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "클래스가 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "404", description = "클래스를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "파일 업로드 중 오류가 발생했습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PatchMapping(value = "/{classId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<String> updateClass(@PathVariable Integer classId,
                                           @RequestPart("classRequest") ClassRequest classRequest,
                                           @RequestPart(value = "classFile", required = false) MultipartFile classFile,
                                           @RequestPart(value = "kitFile", required = false) MultipartFile kitFile) {
        try {
            Integer classFileId = null;
            Integer kitFileId = null;

            if (classFile != null) {
                classFileId = fileService.saveFile(classFile);
            }

            if (kitFile != null) {
                kitFileId = fileService.saveFile(kitFile);
            }

            classService.updateClass(classId, classRequest, classFileId, kitFileId);
        } catch (IOException e) {
            return ResponseDto.of(500, "파일 업로드 중 오류가 발생했습니다.");
        }
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(), "클래스가 성공적으로 수정되었습니다.");
    }

    @Operation(summary = "클래스 삭제", description = "기존 클래스를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "클래스가 성공적으로 삭제되었습니다."),
            @ApiResponse(responseCode = "404", description = "클래스를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @DeleteMapping("/{classId}")
    public ResponseDto<String> deleteClass(@PathVariable Integer classId) {
        classService.deleteClass(classId);
        return ResponseDto.of(NO_CONTENT.value(), SUCCESS_DELETE.getMessage(), "클래스가 성공적으로 삭제되었습니다.");
    }

    @Operation(summary = "클래스 상세 조회", description = "클래스의 상세 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "클래스 상세 정보 조회가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "클래스를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/{classId}")
    public ResponseDto<ClassDetailResponse> getClassDetail(@PathVariable Integer classId) {
        ClassDetailResponse classDetail = classService.getClassDetail(classId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), classDetail);
    }

    @Operation(summary = "클래스 목록 조회", description = "클래스 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "클래스 목록 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping
    public ResponseDto<ClassListResponse> getClassList(@RequestParam Integer page,
                                                       @RequestParam(required = false) Integer categoryId,
                                                       @RequestParam(required = false) Integer tagId,
                                                       @RequestParam(required = false) String searchBy,
                                                       @RequestParam(required = false) String keyword,
                                                       @RequestParam(required = false) String sortBy,
                                                       @RequestParam(required = false) Integer size) {
        ClassListRequest request = ClassListRequest.builder()
                .page(page - 1)
                .categoryId(categoryId)
                .tagId(tagId)
                .searchBy(searchBy)
                .keyword(keyword)
                .sortBy(sortBy)
                .size(size)
                .build();
        ClassListResponse classListResponse = classService.getClassList(request);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), classListResponse);
    }

    @Operation(summary = "주간 인기 클래스 조회", description = "주간 인기 클래스 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "인기 클래스 목록 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping("/weeklybest")
    public ResponseDto<List<ClassResponse>> getPopularClasses() {
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), classService.getPopularClasses());
    }

    @Operation(summary = "주간 최신 클래스 조회", description = "주간 최신 클래스 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "최신 클래스 목록 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping("/weeklynew")
    public ResponseDto<List<ClassResponse>> getLatestClasses() {
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), classService.getLatestClasses());
    }

    @Operation(summary = "리뷰 작성하지 않은 완료한 차시 조회", description = "사용자가 완료한 리뷰 작성하지 않은 차시를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용자가 완료한 리뷰 작성하지 않은 차시 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping("/{classId}/completed-lectures/reviews")
    public ResponseDto<List<LectureResponse>> getCompletedLecturesWithoutReviews(@PathVariable Integer classId, @RequestParam Integer userId) {
        List<LectureResponse> lectures = lectureService.getCompletedLecturesWithoutReviews(classId, userId);
        if (lectures.isEmpty()) {
            return ResponseDto.of(BAD_REQUEST.value(), "사용자가 해당 수업을 듣지 않았습니다.");
        }
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), lectures);
    }
}
