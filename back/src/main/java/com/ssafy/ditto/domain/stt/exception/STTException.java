package com.ssafy.ditto.domain.stt.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class STTException extends RuntimeException {
    private final STTErrorCode errorCode;
}
