package com.ssafy.ditto.domain.post.service;

import java.util.Map;

import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.post.dto.PostRequest;
import com.ssafy.ditto.domain.post.dto.PostList;

public interface PostService {
    String writePost(PostRequest postReq) throws Exception;
    PostList searchPost(Map<String,String> map) throws Exception;
    PostList bestPost(Map<String,String> map) throws Exception;
    PostList userPost(Map<String,String> map) throws Exception;
    Post getPost(int postId) throws Exception;
    void modifyPost(PostRequest postReq) throws Exception;
    void deletePost(int postId) throws Exception;

    void addView(int postId) throws Exception;
    void addLike(int postId, int userId) throws Exception;
    int removeLike(int postId, int userId) throws Exception;
    int checkLike(int postId, int userId) throws Exception;
}