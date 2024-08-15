package com.ssafy.ditto.domain.post.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.ssafy.ditto.domain.file.service.FileService;
import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.post.dto.PostRequest;
import com.ssafy.ditto.domain.post.dto.PostResponse;
import com.ssafy.ditto.domain.post.service.PostService;
import com.ssafy.ditto.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;
    private final FileService fileService;

    @Operation(summary = "게시글 작성", description = "커뮤니티 게시글을 작성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "게시글 작성이 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "게시판 또는 카테고리, 태그를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<String> writePost(
            @RequestPart(value = "post") @Valid PostRequest postReq,
            @RequestPart(value = "files", required = false) List<MultipartFile> files){
        int postId = postService.writePost(postReq);
        if(files != null) {
            try {
                fileService.saveList(postId, files);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return ResponseDto.of(CREATED.value(), SUCCESS_WRITE.getMessage(),"게시물 등록 성공");
    }

    @Operation(summary = "게시글 목록 조회", description = "커뮤니티 게시글 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 목록 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping
    public ResponseDto<PostList> getPostList(@RequestParam Map<String, String> map){
        PostList postList = postService.searchPost(map);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),postList);
    }

    @Operation(summary = "주간 베스트 게시글 목록 조회", description = "최근 1주간 좋아요를 많이 받은 커뮤니티 게시글 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "베스트 게시글 목록 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping("/weeklybest")
    public ResponseDto<PostList> bestPostList(){
        PostList postList = postService.bestPost();
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),postList);
    }

    @Operation(summary = "게시글 상세 조회", description = "게시글의 상세 내용을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 상세 조회가 성공적으로 완료되었습니다.")
    })
    @GetMapping("/{postId}")
    public ResponseDto<PostResponse> getPost(@PathVariable("postId") int postId){
        PostResponse post = postService.getPost(postId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),post);
    }

    @Operation(summary = "게시글 수정", description = "기존 게시글을 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 수정이 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PatchMapping(value = "/{postId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<String> modifyPost(
            @PathVariable("postId") int postId,
            @RequestPart(value = "post") @Valid PostRequest postReq,
            @RequestPart(value = "files", required = false) List<MultipartFile> files){
        postService.modifyPost(postId, postReq);
        if(files != null) {
            try {
                fileService.updateList(postId, files);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage());
    }

    @Operation(summary = "게시글 삭제", description = "기존 게시글을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "게시글 삭제가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @DeleteMapping("/{postId}")
    public ResponseDto<Void> deletePost(@PathVariable("postId") int postId){
        try {
            fileService.deleteList(postId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        postService.deletePost(postId);
        return ResponseDto.of(NO_CONTENT.value(), SUCCESS_DELETE.getMessage());
    }

    @Operation(summary = "게시글 좋아요 상태 확인", description = "게시글의 좋아요 상태를 확인합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 좋아요 상태 조회가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "게시글 혹은 사용자를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @GetMapping("/{postId}/like")
    public ResponseDto<Boolean> checkLikePost(@PathVariable("postId") int postId, @RequestParam("userId") int userId){
        Boolean liked = postService.checkLike(postId,userId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),liked);
    }

    @Operation(summary = "게시글 좋아요 생성", description = "게시글의 좋아요를 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "게시글 좋아요 생성이 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "게시글 혹은 사용자를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping("/{postId}/like")
    public ResponseDto<Void> addLikePost(@PathVariable("postId") int postId, @RequestParam("userId") int userId){
        postService.addLike(postId,userId);
        return ResponseDto.of(CREATED.value(), SUCCESS_LIKE.getMessage());
    }

    @Operation(summary = "게시글 좋아요 취소", description = "게시글의 좋아요를 취소합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "게시글 좋아요 취소가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "게시글 혹은 사용자를 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = ResponseDto.class)))
    })
    @DeleteMapping("/{postId}/like")
    public ResponseDto<Void> removeLikePost(@PathVariable("postId") int postId, @RequestParam("userId") int userId){
        postService.removeLike(postId,userId);
        return ResponseDto.of(NO_CONTENT.value(), SUCCESS_UNLIKE.getMessage());
    }
}
