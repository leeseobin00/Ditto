package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.dto.*;
import com.ssafy.ditto.domain.classes.service.ClassService;
import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.classes.service.StepService;
import com.ssafy.ditto.domain.file.service.FileService;
import com.ssafy.ditto.global.dto.ResponseDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor
public class ClassController {
    private final ClassService classService;
    private final StepService stepService;
    private final LectureService lectureService;
    private final FileService fileService;

    @PostMapping
    public ResponseDto<Void> createClass(@RequestPart("classRequest") ClassRequest classRequest,
                                         @RequestPart(value = "classFile", required = false) MultipartFile classFile,
                                         @RequestPart(value = "kitFile", required = false) MultipartFile kitFile) {
        try {
            Integer classFileId = null;
            Integer kitFileId = null;

            if (classFile != null) {
                classFileId = fileService.saveFile(classFile);
            }

            if (kitFile != null) {
                kitFileId = fileService.saveFile(kitFile);
            }

            classService.createClass(classRequest, classFileId, kitFileId);
            return ResponseDto.of(201, "클래스가 성공적으로 생성되었습니다.");
        } catch (IOException e) {
            return ResponseDto.of(500, "파일 업로드 중 오류가 발생했습니다.");
        }
    }

//    @PostMapping("/{classId}/steps")
//    public ResponseDto<Void> addSteps(@PathVariable Integer classId, @RequestBody List<StepRequest> stepRequests) {
//        stepService.addSteps(classId, stepRequests);
//        return ResponseDto.of(201, "스텝이 성공적으로 추가되었습니다.");
//    }

    @PatchMapping("/{classId}")
    public ResponseDto<Void> updateClass(@PathVariable Integer classId,
                                         @RequestPart("classRequest") ClassRequest classRequest,
                                         @RequestPart(value = "classFile", required = false) MultipartFile classFile,
                                         @RequestPart(value = "kitFile", required = false) MultipartFile kitFile) {
        try {
            Integer classFileId = null;
            Integer kitFileId = null;

            if (classFile != null) {
                classFileId = fileService.saveFile(classFile);
            }

            if (kitFile != null) {
                kitFileId = fileService.saveFile(kitFile);
            }

            classService.updateClass(classId, classRequest, classFileId, kitFileId);
            return ResponseDto.of(200, "클래스가 성공적으로 수정되었습니다.");
        } catch (IOException e) {
            return ResponseDto.of(500, "파일 업로드 중 오류가 발생했습니다.");
        }
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

    @GetMapping("/{classId}")
    public ResponseDto<ClassDetailResponse> getClassDetail(@PathVariable Integer classId) {
        ClassDetailResponse classDetail = classService.getClassDetail(classId);
        return ResponseDto.of(200, "클래스 상세 정보 조회가 성공적으로 완료되었습니다.", classDetail);
    }
}
