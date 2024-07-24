package com.ssafy.ditto.domain.post.service;

import java.util.Map;

import com.ssafy.ditto.domain.post.dto.PostRequest;
import com.ssafy.ditto.domain.post.dto.PostList;
import com.ssafy.ditto.domain.post.dto.PostResponse;

public interface PostService {
    int writePost(PostRequest postReq);
    PostList searchPost(Map<String,String> map);
    PostList bestPost();
    PostList userPost(int userId, Map<String,String> map);
    PostResponse getPost(int postId);
    String modifyPost(int postId, PostRequest postReq);
    String deletePost(int postId);

    String addLike(int postId, int userId);
    String removeLike(int postId, int userId);
    Boolean checkLike(int postId, int userId);
}