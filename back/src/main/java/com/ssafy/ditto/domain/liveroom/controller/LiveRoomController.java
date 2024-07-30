package com.ssafy.ditto.domain.liveroom.controller;

import com.ssafy.ditto.domain.liveroom.service.LiveRoomService;
import com.ssafy.ditto.global.dto.ResponseDto;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(
//        origins = {}, // SSL 이후 설정 필요
//        allowCredentials = "true",
//        allowedHeaders = "*",
//        methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.OPTIONS}
//)
@RestController
@RequiredArgsConstructor
@RequestMapping("/live-rooms")
public class LiveRoomController {
    private final LiveRoomService liveRoomService;

    @GetMapping("/{lectureId}")
    public ResponseDto<Integer> getUserCount(@PathVariable int lectureId) {
        int userCount = liveRoomService.getUserCount(lectureId);
        return ResponseDto.of(200, "라이브 참여 인원 조회가 성공적으로 완료되었습니다.",userCount);
    }

    @GetMapping("/enter/{lectureId}")
    public ResponseDto<String> getSessionName(@PathVariable int lectureId) {

        return ResponseDto.of(200, "라이브 참여 세션명 조회가 성공적으로 완료되었습니다.",null);
    }



}
