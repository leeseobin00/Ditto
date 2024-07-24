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
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;
    private final FileService fileService;

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
        return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(),"게시물 등록 성공");
    }

    @GetMapping
    public ResponseDto<PostList> getPostList(@RequestParam Map<String, String> map){
        PostList postList = postService.searchPost(map);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),postList);
    }

    @GetMapping("/weeklybest")
    public ResponseDto<PostList> bestPostList(){
        PostList postList = postService.bestPost();
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),postList);
    }

    @GetMapping("/{postId}")
    public ResponseDto<PostResponse> getPost(@PathVariable("postId") int postId){
        PostResponse post = postService.getPost(postId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),post);
    }

    @PatchMapping(value = "/{postId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<String> modifyPost(
            @PathVariable("postId") int postId,
            @RequestPart(value = "post") @Valid PostRequest postReq,
            @RequestPart(value = "files", required = false) List<MultipartFile> files){
        String response = postService.modifyPost(postId, postReq);
        if(files != null) {
            try {
                fileService.updateList(postId, files);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(),response);
    }

    @DeleteMapping("/{postId}")
    public ResponseDto<String> deletePost(@PathVariable("postId") int postId){
        try {
            fileService.deleteList(postId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String response = postService.deletePost(postId);
        return ResponseDto.of(OK.value(), SUCCESS_DELETE.getMessage(),response);
    }

    @GetMapping("/{postId}/like")
    public ResponseDto<Boolean> checkLikePost(@PathVariable("postId") int postId, @RequestParam("userId") int userId){
        Boolean liked = postService.checkLike(postId,userId);
        return ResponseDto.of(OK.value(), SUCCESS_FETCH.getMessage(),liked);
    }

    @PostMapping("/{postId}/like")
    public ResponseDto<String> addLikePost(@PathVariable("postId") int postId, @RequestParam("userId") int userId){
        String response = postService.addLike(postId,userId);
        return ResponseDto.of(OK.value(), SUCCESS_LIKE.getMessage(),response);
    }

    @DeleteMapping("/{postId}/like")
    public ResponseDto<String> removeLikePost(@PathVariable("postId") int postId, @RequestParam("userId") int userId){
        String response = postService.removeLike(postId,userId);
        return ResponseDto.of(OK.value(), SUCCESS_UNLIKE.getMessage(),response);
    }
}
