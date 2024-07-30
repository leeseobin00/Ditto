package com.ssafy.ditto.domain.post.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PostErrorCode {
    POST_NOT_EXIST("POST_NOT_EXIST", "게시글이 존재하지 않습니다."),
    POST_LIKE_EXIST_ERROR("POST_LIKE_EXIST_ERROR", "이미 좋아요를 눌렀습니다. 추가할 수 없습니다."),
    POST_LIKE_CANCEL_ERROR("POST_LIKE_CANCEL_ERROR", "좋아요가 존재하지 않아 취소할 수 없습니다.");

    private final String code;
    private final String message;
}
