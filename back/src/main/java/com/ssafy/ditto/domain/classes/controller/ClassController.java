package com.ssafy.ditto.domain.classes.controller;

import com.ssafy.ditto.domain.classes.dto.ClassRequest;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.service.ClassService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor
public class ClassController {
    private final ClassService classService;

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

}
