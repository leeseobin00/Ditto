package com.ssafy.ditto.domain.comment.controller;

import com.ssafy.ditto.domain.comment.dto.CommentRequest;
import com.ssafy.ditto.domain.comment.dto.CommentResponse;
import com.ssafy.ditto.domain.comment.service.CommentService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/{postId}")
    public ResponseDto<String> writeComment(@PathVariable int postId, @RequestBody CommentRequest commentReq){
        String response = commentService.writeComment(postId,commentReq);
        return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(),response);
    }

    @GetMapping("/{postId}")
    public ResponseDto<List<CommentResponse>> getCommentList(@PathVariable int postId){
        List<CommentResponse> commentList = commentService.getCommentList(postId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), commentList);
    }

    @PatchMapping("/{commentId}")
    public ResponseDto<String> modifyComment(@PathVariable int commentId, @RequestBody CommentRequest commentReq){
        String response = commentService.modifyComment(commentId,commentReq);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(),response);
    }

    @DeleteMapping("/{commentId}")
    public ResponseDto<String> deleteComment(@PathVariable int commentId){
        String response = commentService.deleteComment(commentId);
        return ResponseDto.of(OK.value(), SUCCESS_DELETE.getMessage(),response);
    }
}
