package com.ssafy.ditto.domain.comment.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CommentErrorCode {
    COMMENT_NOT_EXIST("COMMENT_NOT_EXIST", "댓글이 존재하지 않습니다."),
    COMMENT_LEVEL_EXCEED("COMMENT_LEVEL_EXCEED", "댓글 레벨을 초과했습니다."),
    PARENT_COMMENT_NOT_EXIST("PARENT_COMMENT_NOT_EXIST", "부모 댓글이 존재하지 않습니다."),
    COMMENT_NOT_SAME_POST("COMMENT_NOT_SAME_POST", "부모 댓글과 자식 댓글이 동일한 게시글에 있지 않습니다."),
    CANNOT_MODIFY_DELETED_COMMENT("CANNOT_MODIFY_DELETED_COMMENT", "삭제된 댓글은 수정할 수 없습니다.");

    private final String code;
    private final String message;
}