package com.ssafy.ditto.domain.comment.controller;

import com.ssafy.ditto.domain.comment.dto.CommentRequest;
import com.ssafy.ditto.domain.comment.dto.CommentResponse;
import com.ssafy.ditto.domain.comment.service.CommentService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    @Operation(summary = "댓글 작성", description = "커뮤니티 게시글의 댓글 및 대댓글을 작성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "댓글 작성이 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping("/{postId}")
    public ResponseDto<String> writeComment(@PathVariable int postId, @RequestBody CommentRequest commentReq){
        String response = commentService.writeComment(postId,commentReq);
        return ResponseDto.of(CREATED.value(), SUCCESS_WRITE.getMessage(),response);
    }

    @Operation(summary = "댓글 목록 조회", description = "커뮤니티 게시글의 댓글 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "댓글 목록 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping("/{postId}")
    public ResponseDto<List<CommentResponse>> getCommentList(@PathVariable int postId){
        List<CommentResponse> commentList = commentService.getCommentList(postId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(), commentList);
    }

    @Operation(summary = "댓글 수정", description = "기존 댓글을 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "댓글 수정이 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "댓글을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PatchMapping("/{commentId}")
    public ResponseDto<Void> modifyComment(@PathVariable int commentId, @RequestBody CommentRequest commentReq){
        commentService.modifyComment(commentId,commentReq);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage());
    }

    @Operation(summary = "댓글 삭제", description = "기존 댓글을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "댓글 삭제가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "댓글을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @DeleteMapping("/{commentId}")
    public ResponseDto<Void> deleteComment(@PathVariable int commentId){
        commentService.deleteComment(commentId);
        return ResponseDto.of(NO_CONTENT.value(), SUCCESS_DELETE.getMessage());
    }
}
