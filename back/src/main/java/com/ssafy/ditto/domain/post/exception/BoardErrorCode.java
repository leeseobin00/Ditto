package com.ssafy.ditto.domain.post.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BoardErrorCode {
    BOARD_NOT_EXIST("BOARD_NOT_EXIST", "게시판이 존재하지 않습니다.");

    private final String code;
    private final String message;
}
