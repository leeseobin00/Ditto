package com.ssafy.ditto.global.error;

import lombok.Getter;

@Getter
public class ErrorResponse {
    private final int httpStatus;
    private final String message;
    private final String code;
    private final String detailMessage;

    public ErrorResponse(ErrorCode errorCode, String detailMessage) {
        this.httpStatus = errorCode.getHttpStatus();
        this.message = errorCode.getMessage();
        this.code = errorCode.getCode();
        this.detailMessage = detailMessage;
    }

    public ErrorResponse(ErrorCode errorCode) {
        this.httpStatus = errorCode.getHttpStatus();
        this.message = errorCode.getMessage();
        this.code = errorCode.getCode();
        this.detailMessage = null;
    }
}