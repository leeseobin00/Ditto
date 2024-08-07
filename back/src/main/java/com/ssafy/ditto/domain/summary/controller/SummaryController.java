package com.ssafy.ditto.domain.summary.controller;

import com.ssafy.ditto.domain.summary.service.ChatGptService;
import com.ssafy.ditto.domain.summary.service.SummaryService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/summary")
@RequiredArgsConstructor
public class SummaryController {
    private final SummaryService summaryService;
    private final ChatGptService chatGptService;

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

}
