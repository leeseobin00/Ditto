package com.ssafy.ditto.domain.summary.controller;

import com.ssafy.ditto.domain.summary.service.ChatGptService;
import com.ssafy.ditto.domain.summary.service.SummaryService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/summary")
@RequiredArgsConstructor
public class SummaryController {
    private final SummaryService summaryService;
    private final ChatGptService chatGptService;

    @PostMapping
    public ResponseDto<Void> addText(@PathVariable int lectureId,
                                     @PathVariable int stepId,
                                     @RequestBody String originText) {
        String summarizedText = chatGptService.summarize(originText);
        summaryService.addText(lectureId, stepId, summarizedText);
        return ResponseDto.of(201, "텍스트 등록이 성공적으로 완료되었습니다.");
    }

}
