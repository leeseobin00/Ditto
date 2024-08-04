package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.dto.LectureRequest;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;
import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classes/{classId}/lectures")
@RequiredArgsConstructor
public class LectureController {
    private final LectureService lectureService;

    @GetMapping
    public ResponseDto<List<LectureResponse>> getLecturesByClassId(@PathVariable Integer classId) {
        List<LectureResponse> lectureList = lectureService.getLecturesByClassId(classId);
        return ResponseDto.of(200, "클래스의 강의 목록 조회가 성공적으로 완료되었습니다.", lectureList);
    }

    @PostMapping
    public ResponseDto<Void> createLecture(@PathVariable Integer classId, @RequestBody LectureRequest lectureRequest) {
        lectureService.createLecture(classId, lectureRequest);
        return ResponseDto.of(201, "차시가 성공적으로 추가되었습니다.");
    }

    @PatchMapping("/{lectureId}")
    public ResponseDto<Void> updateLecture(@PathVariable Integer classId, @PathVariable Integer lectureId, @RequestBody LectureRequest lectureRequest) {
        lectureService.updateLecture(classId, lectureId, lectureRequest);
        return ResponseDto.of(200, "차시가 성공적으로 수정되었습니다.");
    }

    @DeleteMapping("/{lectureId}")
    public ResponseDto<Void> deleteLecture(@PathVariable Integer classId, @PathVariable Integer lectureId) {
        lectureService.deleteLecture(classId, lectureId);
        return ResponseDto.of(204, "차시가 성공적으로 삭제되었습니다.");
    }
}
