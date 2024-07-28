package com.ssafy.ditto.domain.answer.controller;

import com.ssafy.ditto.domain.answer.dto.AnswerRequest;
import com.ssafy.ditto.domain.answer.service.AnswerService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;

    @PostMapping("/questions/{questionId}/answers")
    public ResponseDto<Void> createAnswer(@PathVariable Integer questionId, @RequestBody AnswerRequest answerRequest) {
        answerService.createAnswer(questionId, answerRequest);
        return ResponseDto.of(200, "답변이 성공적으로 작성되었습니다.");
    }

    @PatchMapping("/answers/{answerId}")
    public ResponseDto<Void> updateAnswer(@PathVariable Integer answerId, @RequestBody AnswerRequest answerRequest) {
        answerService.updateAnswer(answerId, answerRequest);
        return ResponseDto.of(200, "답변이 성공적으로 수정되었습니다.");
    }

    @DeleteMapping("/answers/{answerId}")
    public ResponseDto<Void> deleteAnswer(@PathVariable Integer answerId) {
        answerService.deleteAnswer(answerId);
        return ResponseDto.of(200, "답변이 성공적으로 삭제되었습니다.");
    }
}
