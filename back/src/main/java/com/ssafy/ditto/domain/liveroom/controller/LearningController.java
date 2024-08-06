package com.ssafy.ditto.domain.liveroom.controller;

import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.liveroom.domain.Learning;
import com.ssafy.ditto.domain.liveroom.service.LearningService;
import com.ssafy.ditto.domain.liveroom.service.LiveRoomService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/learning")
public class LearningController {
    private final LiveRoomService liveRoomService;
    private final LearningService learningService;
    private final LectureService lectureService;
}
