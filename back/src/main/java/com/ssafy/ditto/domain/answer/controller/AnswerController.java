package com.ssafy.ditto.domain.answer.controller;

import com.ssafy.ditto.domain.answer.dto.AnswerRequest;
import com.ssafy.ditto.domain.answer.dto.AnswerResponse;
import com.ssafy.ditto.domain.answer.service.AnswerService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/questions/{questionId}/answers")
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;

    @PostMapping
    public ResponseDto<Void> createAnswer(@PathVariable Integer questionId, @RequestBody AnswerRequest answerRequest) {
        answerService.createAnswer(questionId, answerRequest);
        return ResponseDto.of(200, "답변이 성공적으로 작성되었습니다.");
    }

    @PatchMapping("/{answerId}")
    public ResponseDto<Void> updateAnswer(@PathVariable Integer questionId, @PathVariable Integer answerId, @RequestBody AnswerRequest answerRequest) {
        answerService.updateAnswer(answerId, answerRequest);
        return ResponseDto.of(200, "답변이 성공적으로 수정되었습니다.");
    }

    @DeleteMapping("/{answerId}")
    public ResponseDto<Void> deleteAnswer(@PathVariable Integer questionId, @PathVariable Integer answerId) {
        answerService.deleteAnswer(answerId);
        return ResponseDto.of(200, "답변이 성공적으로 삭제되었습니다.");
    }

    @GetMapping
    public ResponseDto<AnswerResponse> getAnswer(@PathVariable Integer questionId) {
        AnswerResponse answerResponse = answerService.getAnswer(questionId);
        return ResponseDto.of(200, "답변이 성공적으로 조회되었습니다.", answerResponse);
    }
}
