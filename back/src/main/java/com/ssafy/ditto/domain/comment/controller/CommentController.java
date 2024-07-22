package com.ssafy.ditto.domain.comment.controller;

import com.ssafy.ditto.domain.comment.dto.CommentRequest;
import com.ssafy.ditto.domain.comment.dto.CommentResponse;
import com.ssafy.ditto.domain.comment.service.CommentService;
import com.ssafy.ditto.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static com.ssafy.ditto.global.error.ErrorCode.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/{postId}")
    public ResponseDto<String> writeComment(@PathVariable int postId, @RequestBody CommentRequest commentReq){
        try{
            String response = commentService.writeComment(postId,commentReq);
            return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(),response);
        } catch (Exception e) {
            return ResponseDto.of(INTERNAL_SERVER_ERROR.getHttpStatus(), ERROR_WRITE.getMessage(), "실패");
        }
    }

    @GetMapping("/{postId}")
    public ResponseDto<List<CommentResponse>> getCommentList(@PathVariable int postId){
        try {
            List<CommentResponse> commentList = commentService.getCommentList(postId);
            return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), commentList);
        } catch (Exception e) {
            return ResponseDto.of(INTERNAL_SERVER_ERROR.getHttpStatus(), ERROR_FETCH.getMessage(), null);
        }
    }

    @PatchMapping("/{commentId}")
    public ResponseDto<String> modifyComment(@PathVariable int commentId, @RequestBody CommentRequest commentReq){
        try{
            String response = commentService.modifyComment(commentId,commentReq);
            return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(),response);
        } catch (Exception e) {
            return ResponseDto.of(INTERNAL_SERVER_ERROR.getHttpStatus(), ERROR_UPDATE.getMessage(), "실패");
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseDto<String> deleteComment(@PathVariable int commentId){
        try{
            String response = commentService.deleteComment(commentId);
            return ResponseDto.of(OK.value(), SUCCESS_DELETE.getMessage(),response);
        } catch (Exception e) {
            return ResponseDto.of(INTERNAL_SERVER_ERROR.getHttpStatus(), ERROR_DELETE.getMessage(), "실패");
        }
    }
}
