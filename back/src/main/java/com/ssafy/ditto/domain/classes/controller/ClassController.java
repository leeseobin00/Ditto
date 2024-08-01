package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.dto.*;
import com.ssafy.ditto.domain.classes.service.ClassService;
import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.classes.service.LikeClassService;
import com.ssafy.ditto.domain.file.service.FileService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor
public class ClassController {
    private final ClassService classService;
    private final LectureService lectureService;
    private final FileService fileService;
    private final LikeClassService likeClassService;

    @PostMapping
    public ResponseDto<?> createClass(@RequestPart("classRequest") ClassRequest classRequest,
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

            int classId = classService.createClass(classRequest, classFileId, kitFileId);
            return ResponseDto.of(201, "클래스가 성공적으로 생성되었습니다.", classId);
        } catch (IOException e) {
            return ResponseDto.of(500, "파일 업로드 중 오류가 발생했습니다.");
        }
    }

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

    @GetMapping
    public ResponseDto<ClassListResponse> getClassList(@RequestParam Integer page,
                                                       @RequestParam(required = false) Integer categoryId,
                                                       @RequestParam(required = false) Integer tagId,
                                                       @RequestParam(required = false) String searchBy,
                                                       @RequestParam(required = false) String keyword,
                                                       @RequestParam(required = false) String sortBy,
                                                       @RequestParam(required = false) String userNickname) {
        ClassListRequest request = ClassListRequest.builder()
                .page(page)
                .categoryId(categoryId)
                .tagId(tagId)
                .searchBy(searchBy)
                .keyword(keyword)
                .sortBy(sortBy)
                .build();
        ClassListResponse classListResponse = classService.getClassList(request);
        return ResponseDto.of(200, "클래스 목록 조회가 성공적으로 완료되었습니다.", classListResponse);
    }


    @GetMapping("/weeklybest")
    public ResponseDto<List<ClassResponse>> getPopularClasses() {
        return ResponseDto.of(200, "인기 클래스 목록 조회가 성공적으로 완료되었습니다.", classService.getPopularClasses());
    }

    @GetMapping("/weeklynew")
    public ResponseDto<List<ClassResponse>> getLatestClasses() {
        return ResponseDto.of(200, "최신 클래스 목록 조회가 성공적으로 완료되었습니다.", classService.getLatestClasses());
    }

    @GetMapping("/{classId}/like")
    public ResponseDto<Boolean> checkLikeStatus(@PathVariable Integer classId, @RequestParam Integer userId) {
        boolean liked = likeClassService.checkLikeStatus(userId, classId);
        return ResponseDto.of(200, "클래스 좋아요 상태 조회가 성공적으로 완료되었습니다.", liked);
    }

    @PostMapping("/{classId}/likes")
    public ResponseDto<Void> likeClass(@PathVariable Integer classId, @RequestBody Map<String, Integer> requestBody) {
        Integer userId = requestBody.get("userId");
        likeClassService.likeClass(classId, userId);
        return ResponseDto.of(201, "클래스 좋아요가 성공적으로 완료되었습니다.");
    }

    @DeleteMapping("/{classId}/likes")
    public ResponseDto<Void> unlikeClass(@PathVariable Integer classId, @RequestBody Map<String, Integer> requestBody) {
        Integer userId = requestBody.get("userId");
        likeClassService.unlikeClass(classId, userId);
        return ResponseDto.of(204, "클래스 좋아요 취소가 성공적으로 완료되었습니다.");
    }

    @GetMapping("/{classId}/lectures/reviews")
    public ResponseDto<List<LectureResponse>> getLectureWithoutReviews(@PathVariable Integer classId, @RequestParam Integer userId) {
        List<LectureResponse> lectureList = lectureService.getLecturesWithoutReviews(classId, userId);
        return ResponseDto.of(200, "해당 클래스의 리뷰 작성하지 않은 차시 조회가 성공적으로 완료되었습니다.", lectureList);
    }

    @GetMapping("/{classId}/completed-lectures/reviews")
    public ResponseDto<List<LectureResponse>> getCompletedLecturesWithoutReviews(@PathVariable Integer classId, @RequestParam Integer userId) {
        List<LectureResponse> lectures = lectureService.getCompletedLecturesWithoutReviews(classId, userId);
        return ResponseDto.of(200, "사용자가 완료한 리뷰 작성하지 않은 차시 조회가 성공적으로 완료되었습니다.", lectures);
    }
}
