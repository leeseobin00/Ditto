package com.ssafy.ditto.domain.stt.controller;

import com.ssafy.ditto.domain.stt.service.STTService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.ssafy.ditto.global.dto.ResponseMessage.SUCCESS_CONVERT;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stt")
public class STTController {
    private final STTService sttService;

    @PostMapping(value = "/audio", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseDto<String> handleAudioMessage(@RequestParam("audio") MultipartFile audioFile) throws IOException {
        String transcribe = sttService.transcribe(audioFile);
        return ResponseDto.of(OK.value(), SUCCESS_CONVERT.getMessage(),transcribe);
    }
}
