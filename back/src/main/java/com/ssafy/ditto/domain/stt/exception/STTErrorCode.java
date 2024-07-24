package com.ssafy.ditto.domain.stt.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum STTErrorCode {
    AUDIO_NOT_EXIST("AUDIO_NOT_EXIST", "음성이 존재하지 않습니다.");

    private final String code;
    private final String message;
}
