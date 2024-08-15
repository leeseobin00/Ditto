package com.ssafy.ditto.domain.liveroom.controller;

import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.liveroom.domain.Learning;
import com.ssafy.ditto.domain.liveroom.dto.LearningPageResponse;
import com.ssafy.ditto.domain.liveroom.service.LearningService;
import com.ssafy.ditto.domain.liveroom.service.LiveRoomService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "수강생의 내 강의실 목록 조회", description = "수강생의 앞으로 수강할 라이브 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "앞으로 수강할 라이브 목록 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping("/student/{userId}")
    public ResponseDto<LearningPageResponse> getStudentLearning(@PathVariable int userId,
                                                                @RequestParam int page) {
        Pageable pageable = PageRequest.of(page - 1, 3);
        LearningPageResponse response = learningService.getStudentLearning(userId, pageable);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), response);
    }

    @Operation(summary = "강사의 내 강의실 목록 조회", description = "강사의 앞으로 진행할 라이브 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "앞으로 진행할 라이브 목록 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping("/teacher/{userId}")
    public ResponseDto<LearningPageResponse> getTeacherLearning(@PathVariable int userId,
                                                                @RequestParam int page) {
        Pageable pageable = PageRequest.of(page - 1, 3);
        LearningPageResponse response = learningService.getTeacherLearning(userId, pageable);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), response);
    }
}
