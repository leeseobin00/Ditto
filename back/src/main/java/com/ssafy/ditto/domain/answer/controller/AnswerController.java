package com.ssafy.ditto.domain.answer.controller;

import com.ssafy.ditto.domain.answer.dto.AnswerRequest;
import com.ssafy.ditto.domain.answer.dto.AnswerResponse;
import com.ssafy.ditto.domain.answer.service.AnswerService;
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

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/questions/{questionId}/answers")
@RequiredArgsConstructor
@Tag(name = "Answer", description = "Answer API")
public class AnswerController {
    private final AnswerService answerService;

    @Operation(summary = "클래스 문의 답변 작성", description = "질문 ID에 따라 답변을 작성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "답변이 성공적으로 작성되었습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "질문을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @PostMapping
    public ResponseDto<String> createAnswer(@PathVariable Integer questionId, @RequestBody AnswerRequest answerRequest) {
        answerService.createAnswer(questionId, answerRequest);
        return ResponseDto.of(CREATED.value(), SUCCESS_WRITE.getMessage(), "답변이 성공적으로 작성되었습니다.");
    }

    @Operation(summary = "클래스 문의 답변 수정", description = "질문 ID와 답변 ID에 따라 답변을 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "답변이 성공적으로 수정되었습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "답변을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @PatchMapping("/{answerId}")
    public ResponseDto<String> updateAnswer(@PathVariable Integer questionId, @PathVariable Integer answerId, @RequestBody AnswerRequest answerRequest) {
        answerService.updateAnswer(answerId, answerRequest);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(), "답변이 성공적으로 수정되었습니다.");
    }

    @Operation(summary = "클래스 문의 답변 삭제", description = "질문 ID와 답변 ID에 따라 답변을 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "답변이 성공적으로 삭제되었습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "답변을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @DeleteMapping("/{answerId}")
    public ResponseDto<String> deleteAnswer(@PathVariable Integer questionId, @PathVariable Integer answerId) {
        answerService.deleteAnswer(answerId);
        return ResponseDto.of(NO_CONTENT.value(), SUCCESS_DELETE.getMessage(), "답변이 성공적으로 삭제되었습니다.");
    }

    @Operation(summary = "클래스 문의 답변 조회", description = "질문 ID에 따라 답변을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "답변이 성공적으로 조회되었습니다.", content = @Content(schema = @Schema(implementation = AnswerResponse.class))),
            @ApiResponse(responseCode = "404", description = "답변을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping
    public ResponseDto<AnswerResponse> getAnswer(@PathVariable Integer questionId) {
        AnswerResponse answerResponse = answerService.getAnswer(questionId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), answerResponse);
    }
}
