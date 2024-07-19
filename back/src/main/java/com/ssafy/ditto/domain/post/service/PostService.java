package com.ssafy.ditto.domain.post.service;

import java.util.Map;

import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.post.dto.PostRequest;
import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.post.dto.PostResponse;

public interface PostService {
    String writePost(PostRequest postReq) throws Exception;
    PostList searchPost(Map<String,String> map) throws Exception;
    PostList bestPost() throws Exception;
//    PostList userPost(Map<String,String> map) throws Exception;
    PostResponse getPost(int postId) throws Exception;
    String modifyPost(int postId, PostRequest postReq) throws Exception;
    String deletePost(int postId) throws Exception;

    String addLike(int postId, int userId) throws Exception;
    String removeLike(int postId, int userId) throws Exception;
    Boolean checkLike(int postId, int userId) throws Exception;
}