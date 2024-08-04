package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.service.LikeClassService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/classes/{classId}/like")
@RequiredArgsConstructor
public class ClassLikeController {
    private final LikeClassService likeClassService;

    @GetMapping
    public ResponseDto<Boolean> checkLikeStatus(@PathVariable Integer classId, @RequestParam Integer userId) {
        boolean liked = likeClassService.checkLikeStatus(userId, classId);
        return ResponseDto.of(200, "클래스 좋아요 상태 조회가 성공적으로 완료되었습니다.", liked);
    }

    @PostMapping
    public ResponseDto<Void> likeClass(@PathVariable Integer classId, @RequestBody Map<String, Integer> requestBody) {
        Integer userId = requestBody.get("userId");
        likeClassService.likeClass(classId, userId);
        return ResponseDto.of(201, "클래스 좋아요가 성공적으로 완료되었습니다.");
    }

    @DeleteMapping
    public ResponseDto<Void> unlikeClass(@PathVariable Integer classId, @RequestBody Map<String, Integer> requestBody) {
        Integer userId = requestBody.get("userId");
        likeClassService.unlikeClass(classId, userId);
        return ResponseDto.of(204, "클래스 좋아요 취소가 성공적으로 완료되었습니다.");
    }
}
