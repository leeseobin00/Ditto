package com.ssafy.ditto.domain.post.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class PostException extends RuntimeException {
    private final PostErrorCode errorCode;
}
