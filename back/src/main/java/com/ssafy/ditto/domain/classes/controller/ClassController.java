package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.dto.ClassRequest;
import com.ssafy.ditto.domain.classes.dto.LectureRequest;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;
import com.ssafy.ditto.domain.classes.service.ClassService;
import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.global.dto.ResponseDto;
import jdk.javadoc.doclet.Reporter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor
public class ClassController {
    private final ClassService classService;
    private final LectureService lectureService;

    @PostMapping
    public ResponseDto<Void> createClass(@RequestBody ClassRequest classRequest) {
        classService.createClass(classRequest);
        return ResponseDto.of(201, "클래스가 성공적으로 생성되었습니다.");
    }

    @PatchMapping("/{classId}")
    public ResponseDto<Void> updateClass(@PathVariable Integer classId, @RequestBody ClassRequest classRequest) {
        classService.updateClass(classId, classRequest);
        return ResponseDto.of(200, "클래스가 성공적으로 수정되었습니다.");
    }

    @DeleteMapping("/{classId}")
    public ResponseDto<Void> deleteClass(@PathVariable Integer classId) {
        classService.deleteClass(classId);
        return ResponseDto.of(204, "클래스가 성공적으로 삭제되었습니다.");
    }

    @GetMapping("/{classId}/lectures")
    public ResponseDto<List<LectureResponse>> getLecturesByClassId(@PathVariable Integer classId) {
        List<LectureResponse> lectureList = lectureService.getLecturesByClassId(classId);
        return ResponseDto.of(200, "클래스의 강의 목록 조회가 성공적으로 완료되었습니다.", lectureList);
    }

    @PostMapping("/{classId}/lectures")
    public ResponseDto<Void> createLecture(@PathVariable Integer classId, @RequestBody LectureRequest lectureRequest) {
        lectureService.createLecture(classId, lectureRequest);
        return ResponseDto.of(201, "차시가 성공적으로 추가되었습니다.");
    }

    @PatchMapping("/{classId}/lectures/{lectureId}")
    public ResponseDto<Void> updateLecture(@PathVariable Integer classId, @PathVariable Integer lectureId, @RequestBody LectureRequest lectureRequest) {
        lectureService.updateLecture(classId, lectureId, lectureRequest);
        return ResponseDto.of(200, "차시가 성공적으로 수정되었습니다.");
    }

    @DeleteMapping("/{classId}/lectures/{lectureId}")
    public ResponseDto<Void> deleteLecture(@PathVariable Integer classId, @PathVariable Integer lectureId) {
        lectureService.deleteLecture(classId, lectureId);
        return ResponseDto.of(204, "차시가 성공적으로 삭제되었습니다.");
    }
}
