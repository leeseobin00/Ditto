package com.ssafy.ditto.domain.question.controller;

import com.ssafy.ditto.domain.question.dto.QuestionPageResponse;
import com.ssafy.ditto.domain.question.dto.QuestionRequest;
import com.ssafy.ditto.domain.question.service.QuestionService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @PatchMapping("/{questionId}")
    public ResponseDto<Void> updateQuestion(@PathVariable Integer classId, @PathVariable Integer questionId, @RequestBody QuestionRequest questionRequest) {
        questionService.updateQuestion(classId, questionId, questionRequest);
        return ResponseDto.of(200, "클래스 문의가 성공적으로 수정되었습니다.");
    }

    @DeleteMapping("/{questionId}")
    public ResponseDto<Void> deleteQuestion(@PathVariable Integer classId, @PathVariable Integer questionId) {
        questionService.deleteQuestion(classId, questionId);
        return ResponseDto.of(200, "클래스 문의가 성공적으로 삭제되었습니다.");
    }

    @GetMapping
    public ResponseDto<QuestionPageResponse> getClassQuestions(@PathVariable Integer classId,
                                                               @RequestParam int page) {
        Pageable pageable = PageRequest.of(page - 1, 3);
        QuestionPageResponse response = questionService.getClassQuestions(classId, pageable);
        return ResponseDto.of(200, "클래스 문의 목록 조회가 성공적으로 완료되었습니다.", response);
    }
}
