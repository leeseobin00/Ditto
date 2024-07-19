package com.ssafy.ditto.domain.comment.service;

import com.ssafy.ditto.domain.comment.domain.Comment;
import com.ssafy.ditto.domain.comment.dto.CommentRequest;
import com.ssafy.ditto.domain.comment.dto.CommentResponse;

import java.util.List;

public interface CommentService {
    String writeComment(int postId, CommentRequest commentReq) throws Exception;
    List<CommentResponse> getCommentList(int postId) throws Exception;

    String modifyComment(int commentId, CommentRequest commentReq) throws Exception;
    String deleteComment(int commentId) throws Exception;
}
