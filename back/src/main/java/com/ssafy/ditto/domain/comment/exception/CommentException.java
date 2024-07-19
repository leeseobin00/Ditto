package com.ssafy.ditto.domain.comment.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CommentException extends RuntimeException {
    private final CommentErrorCode errorCode;
}