package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.dto.ClassRequest;
import com.ssafy.ditto.domain.classes.dto.LectureRequest;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;
import com.ssafy.ditto.domain.classes.service.ClassService;
import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.file.service.FileService;
import com.ssafy.ditto.global.dto.ResponseDto;
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
    private final LectureService lectureService;
    private final FileService fileService;

    @PostMapping
    public ResponseDto<Void> createClass(@RequestPart("classRequest") ClassRequest classRequest,
                                         @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            Integer fileId = null;
            if (file != null) {
                fileId = fileService.saveFile(file);
            }
            classService.createClass(classRequest, fileId);
            return ResponseDto.of(201, "클래스가 성공적으로 생성되었습니다.");
        } catch (IOException e) {
            return ResponseDto.of(500, "파일 업로드 중 오류가 발생했습니다.");
        }
    }

    @PatchMapping("/{classId}")
    public ResponseDto<Void> updateClass(@PathVariable Integer classId,
                                         @RequestPart("classRequest") ClassRequest classRequest,
                                         @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            Integer fileId = null;
            if (file != null) {
                fileId = fileService.saveFile(file);
            }
            classService.updateClass(classId, classRequest, fileId);
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
}
