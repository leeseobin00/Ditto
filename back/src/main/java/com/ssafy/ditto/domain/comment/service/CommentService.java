package com.ssafy.ditto.domain.comment.service;

import com.ssafy.ditto.domain.comment.dto.CommentRequest;
import com.ssafy.ditto.domain.comment.dto.CommentResponse;

import java.util.List;

public interface CommentService {
    String writeComment(int postId, CommentRequest commentReq);
    List<CommentResponse> getCommentList(int postId);

    String modifyComment(int commentId, CommentRequest commentReq);
    String deleteComment(int commentId);
}
