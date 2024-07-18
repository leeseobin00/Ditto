package com.ssafy.ditto.domain.post.controller;

import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.post.dto.PostRequest;
import com.ssafy.ditto.domain.post.service.PostService;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.ditto.global.error.ErrorCode.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
public class PostController {
    final PostService postService;

    @PostMapping
    public ResponseDto<String> writePost(@RequestBody PostRequest postReq){
        try{
            String response = postService.writePost(postReq);
            return ResponseDto.of(OK.value(), SUCCESS_WRITE.getMessage(),response);
        }
        catch (Exception e) {
            return ResponseDto.of(INTERNAL_SERVER_ERROR.getHttpStatus(), INTERNAL_SERVER_ERROR.getMessage(), "실패");
        }
    }

//    @GetMapping
//    public ResponseDto<PostList> getPostList()
}
