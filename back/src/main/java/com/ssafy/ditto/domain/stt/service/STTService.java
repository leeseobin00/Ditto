package com.ssafy.ditto.domain.stt.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface STTService {
    String transcribe(MultipartFile audioFile) throws IOException;
}
