package com.ssafy.ditto.domain.file.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FileException extends RuntimeException {
    private final FileErrorCode fileErrorCode;
}
