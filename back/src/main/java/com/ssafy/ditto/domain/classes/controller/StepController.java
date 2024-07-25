package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.dto.StepRequest;
import com.ssafy.ditto.domain.classes.service.StepService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/classes/{classId}/steps")
@RequiredArgsConstructor
public class StepController {
    private final StepService stepService;

    @PostMapping
    public ResponseDto<Void> addSteps(@PathVariable Integer classId,
                                      @RequestPart("stepRequests") List<StepRequest> stepRequests,
                                      @RequestPart("stepFiles") List<MultipartFile> stepFiles) {
        try {
            stepService.addSteps(classId, stepRequests, stepFiles);
            return ResponseDto.of(201, "스텝 정보와 파일이 성공적으로 추가되었습니다.");
        } catch (IOException e) {
            return ResponseDto.of(500, "스텝 정보와 파일 추가 중 오류가 발생했습니다.");
        }
    }
}
