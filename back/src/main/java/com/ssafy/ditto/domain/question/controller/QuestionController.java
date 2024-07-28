package com.ssafy.ditto.domain.question.controller;

import com.ssafy.ditto.domain.question.dto.QuestionRequest;
import com.ssafy.ditto.domain.question.service.QuestionService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/classes/{classId}/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping
    public ResponseDto<Void> createQuestion(@PathVariable Integer classId, @RequestBody QuestionRequest questionRequest) {
        questionService.createQuestion(classId, questionRequest);
        return ResponseDto.of(204, "리뷰가 성공적으로 생성되었습니다.");
    }
}
