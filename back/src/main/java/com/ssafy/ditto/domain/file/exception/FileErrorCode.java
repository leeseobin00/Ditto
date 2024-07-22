package com.ssafy.ditto.domain.file.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FileErrorCode {
    FILE_NOT_EXIST("FILE_NOT_EXIST", "해당 파일 없음");

    private final String code;
    private final String message;
}
