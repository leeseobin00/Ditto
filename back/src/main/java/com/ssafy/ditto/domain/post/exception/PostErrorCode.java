package com.ssafy.ditto.domain.post.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PostErrorCode {
    POST_NOT_EXIST("POST_NOT_EXIST", "게시글이 존재하지 않습니다.");

    private final String code;
    private final String message;
}
