package com.ssafy.ditto.domain.summary.controller;

import com.ssafy.ditto.domain.summary.service.SummaryService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/text")
@RequiredArgsConstructor
public class SummaryController {
    private final SummaryService textService;

    @PostMapping
    public ResponseDto<Void> addText(@RequestBody Map<String,Object> map) {
        textService.addText(map);
        return ResponseDto.of(201, "텍스트 등록이 성공적으로 완료되었습니다.");
    }

}
