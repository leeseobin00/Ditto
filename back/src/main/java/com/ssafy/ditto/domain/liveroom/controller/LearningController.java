package com.ssafy.ditto.domain.liveroom.controller;

import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.liveroom.domain.Learning;
import com.ssafy.ditto.domain.liveroom.dto.LearningPageResponse;
import com.ssafy.ditto.domain.liveroom.service.LearningService;
import com.ssafy.ditto.domain.liveroom.service.LiveRoomService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.ditto.global.dto.ResponseMessage.SUCCESS_FETCH;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/learning")
public class LearningController {
    private final LearningService learningService;

    @GetMapping("/student/{userId}")
    public ResponseDto<LearningPageResponse> getStudentLearning(@PathVariable int userId,
                                                                @RequestParam int page) {
        Pageable pageable = PageRequest.of(page - 1, 3);
        LearningPageResponse response = learningService.getStudentLearning(userId, pageable);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), response);
    }

    @GetMapping("/teacher/{userId}")
    public ResponseDto<LearningPageResponse> getTeacherLearning(@PathVariable int userId,
                                                                @RequestParam int page) {
        Pageable pageable = PageRequest.of(page - 1, 3);
        LearningPageResponse response = learningService.getTeacherLearning(userId, pageable);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), response);
    }
}
