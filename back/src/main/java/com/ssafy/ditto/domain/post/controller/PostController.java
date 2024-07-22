package com.ssafy.ditto.domain.post.controller;

import java.util.HashMap;
import java.util.Map;

import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.post.dto.PostRequest;
import com.ssafy.ditto.domain.post.dto.PostResponse;
import com.ssafy.ditto.domain.post.service.PostService;
import com.ssafy.ditto.global.dto.ResponseDto;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.ditto.global.error.ErrorCode.INTERNAL_SERVER_ERROR;
import static com.ssafy.ditto.global.dto.ResponseMessage.*;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseDto<String> writePost(@RequestBody PostRequest postReq){
        String response = postService.writePost(postReq);
        return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(),response);

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

    @PatchMapping("/{postId}")
    public ResponseDto<String> modifyPost(@PathVariable("postId") int postId,@RequestBody PostRequest postReq){
        postReq.setPostId(postId);
        String response = postService.modifyPost(postId, postReq);
        return ResponseDto.of(OK.value(), SUCCESS_UPDATE.getMessage(),response);
    }

    @DeleteMapping("/{postId}")
    public ResponseDto<String> deletePost(@PathVariable("postId") int postId){
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
