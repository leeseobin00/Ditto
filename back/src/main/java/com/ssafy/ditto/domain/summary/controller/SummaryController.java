package com.ssafy.ditto.domain.summary.controller;

import com.ssafy.ditto.domain.summary.dto.SummaryResponse;
import com.ssafy.ditto.domain.summary.service.ChatGptService;
import com.ssafy.ditto.domain.summary.service.SummaryService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/summary")
@RequiredArgsConstructor
public class SummaryController {
    private final SummaryService summaryService;
    private final ChatGptService chatGptService;

    @Operation(summary = "요약 등록", description = "ChatGPT를 통해 STT로 변환된 텍스트로 강의 요약을 합니다.")
    @ApiResponse(responseCode = "201", description = "요약 등록 성공")
    @PostMapping("/{lectureId}/{stepId}")
    public Mono<ResponseDto<?>> addText(@PathVariable int lectureId,
                                        @PathVariable int stepId,
                                        @RequestBody String originText) {
        return chatGptService.summarize(originText)
                .flatMap(summarizedText -> {
                    summaryService.addText(lectureId, stepId, summarizedText);
                    return Mono.just(ResponseDto.of(201, "텍스트 등록이 성공적으로 완료되었습니다.", summarizedText));
                });
    }

    @Operation(summary = "요약 조회", description = "강의 요약을 조회합니다.")
    @ApiResponse(responseCode = "200", description = "요약 조회 성공")
    @GetMapping("/{lectureId}")
    public ResponseDto<List<SummaryResponse>> getSummary(@Parameter(description = "강의 ID", example = "1") @PathVariable("lectureId") int lectureId) {
        List<SummaryResponse> summaryResponses = summaryService.getSummary(lectureId);
        return ResponseDto.of(OK.value(), "요약 조회 성공", summaryResponses);
    }
}
