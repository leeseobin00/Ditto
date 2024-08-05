package com.ssafy.ditto.domain.question.controller;

import com.ssafy.ditto.domain.question.dto.QuestionPageResponse;
import com.ssafy.ditto.domain.question.dto.QuestionRequest;
import com.ssafy.ditto.domain.question.service.QuestionService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.OK;

@Tag(name = "Question", description = "Class Question API")
@RestController
@RequestMapping("/classes/{classId}/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @Operation(summary = "클래스 문의 작성", description = "새로운 클래스를 작성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "클래스 문의가 성공적으로 작성되었습니다."),
            @ApiResponse(responseCode = "404", description = "사용자 또는 클래스를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping
    public ResponseDto<String> createQuestion(@PathVariable Integer classId, @RequestBody QuestionRequest questionRequest) {
        questionService.createQuestion(classId, questionRequest);
        return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(), "클래스 문의가 성공적으로 작성되었습니다.");
    }

    @Operation(summary = "클래스 문의 수정", description = "기존 클래스를 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "클래스 문의가 성공적으로 수정되었습니다."),
            @ApiResponse(responseCode = "404", description = "클래스를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PatchMapping(value = "/{questionId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseDto<String> updateQuestion(@PathVariable Integer classId, @PathVariable Integer questionId, @RequestBody QuestionRequest questionRequest) {
        questionService.updateQuestion(classId, questionId, questionRequest);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(), "클래스 문의가 성공적으로 수정되었습니다.");
    }

    @Operation(summary = "클래스 문의 삭제", description = "기존 클래스를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "클래스 문의가 성공적으로 삭제되었습니다."),
            @ApiResponse(responseCode = "404", description = "클래스를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @DeleteMapping("/{questionId}")
    public ResponseDto<String> deleteQuestion(@PathVariable Integer classId, @PathVariable Integer questionId) {
        questionService.deleteQuestion(classId, questionId);
        return ResponseDto.of(OK.value(), SUCCESS_DELETE.getMessage(), "클래스 문의가 성공적으로 삭제되었습니다.");
    }

    @Operation(summary = "클래스 문의 목록 조회", description = "클래스의 문의 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "클래스 문의 목록 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping
    public ResponseDto<QuestionPageResponse> getClassQuestions(@PathVariable Integer classId,
                                                               @RequestParam int page) {
        Pageable pageable = PageRequest.of(page - 1, 3);
        QuestionPageResponse response = questionService.getClassQuestions(classId, pageable);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), response);
    }
}
