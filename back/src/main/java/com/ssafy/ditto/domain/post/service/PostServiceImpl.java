package com.ssafy.ditto.domain.post.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import com.ssafy.ditto.domain.category.domain.Category;
import com.ssafy.ditto.domain.category.repository.CategoryRepository;
import com.ssafy.ditto.domain.post.domain.Board;
import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.post.dto.PostRequest;
import com.ssafy.ditto.domain.post.dto.PostResponse;
import com.ssafy.ditto.domain.post.exception.BoardException;
import com.ssafy.ditto.domain.post.exception.PostException;
import com.ssafy.ditto.domain.post.repository.BoardRepository;
import com.ssafy.ditto.domain.post.repository.PostRepository;
import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.domain.tag.repository.TagRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.ditto.domain.post.dto.PostList;

import lombok.RequiredArgsConstructor;

import static com.ssafy.ditto.domain.post.exception.BoardErrorCode.*;
import static com.ssafy.ditto.domain.post.exception.PostErrorCode.*;
import static com.ssafy.ditto.global.dto.ResponseMessage.*;

@Component
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    public final PostRepository postRepository;
    public final BoardRepository boardRepository;
    public final CategoryRepository categoryRepository;
    public final TagRepository tagRepository;

    @Override
    @Transactional
    public String writePost(PostRequest postReq) throws Exception {
        Board board = boardRepository.findById(postReq.getBoardId())
                .orElseThrow(() -> new BoardException(BOARD_NOT_EXIST));
        Category category = categoryRepository.findById(postReq.getCategoryId())
                .orElseThrow(() -> new Exception(NOT_FOUND.getMessage()));
        Tag tag = tagRepository.findById(postReq.getCategoryId())
                .orElseThrow(() -> new Exception(NOT_FOUND.getMessage()));
        Post post = new Post();
        post.setTitle(postReq.getTitle());
        post.setContent(postReq.getContent());
        post.setUserId(postReq.getUserId());
        post.setTitle(postReq.getUsername());
        post.setBoard(board);
        post.setCategory(category);
        post.setTag(tag);

        postRepository.save(post);
//        List<File> files = boardDto.getFileInfos();
//        if (fileInfos != null && !fileInfos.isEmpty()) {
//            boardMapper.registerFile(boardDto);
//        }
        return postReq.getBoardId()+"번 게시판에 "+postReq.getPostId()+"번 게시글 작성";
    }

    @Override
    public PostList searchPost(Map<String, String> map) throws Exception {
        int curPage = Integer.parseInt(map.getOrDefault("page", "1"));
        int sizePage = Integer.parseInt(map.getOrDefault("size", "10"));
        int start = (curPage - 1) * sizePage;

        Integer boardId = map.get("boardId") != null ? Integer.parseInt(map.get("boardId")) : null;
        Integer categoryId = map.get("categoryId") != null ? Integer.parseInt(map.get("categoryId")) : null;
        Integer tagId = map.get("tagId") != null ? Integer.parseInt(map.get("tagId")) : null;
        String sortBy = map.getOrDefault("sortBy", "p.post_id"); // 여기 확인 필요.

        List<Post> list = postRepository.getlist(boardId, categoryId, tagId, sortBy, start, sizePage);
        int postCount = postRepository.getPostCount(boardId, categoryId, tagId);
        int pageCount = (postCount - 1) / sizePage + 1;

        PostList postList = new PostList();
//수정 필요
        for(Post post:list){
            postList.getPosts().add(PostResponse.of(post));
        }
        postList.setCurrentPage(curPage);
        postList.setTotalPageCount(pageCount);
        return postList;
    }

    @Override
    public PostList bestPost() throws Exception {
        List<Post> list = postRepository.getBestPosts(LocalDateTime.now());
        PostList postList = new PostList();
         // 수정필요
        for(Post post:list){
            postList.getPosts().add(PostResponse.of(post));
        }
        return postList;
    }

//    @Override
//    public PostList userPost(Map<String, String> map) throws Exception {
//        int curPage = Integer.parseInt(map.getOrDefault("page", "1"));
//        int sizePage = Integer.parseInt(map.getOrDefault("size", "10"));
//        int start = (curPage - 1) * sizePage;
//
//        int userId = Integer.parseInt(map.get("userId"));
//        List<Post> posts = postRepository.findByUserId(userId);
//
//        PostList postList = new PostList();
//        postList.setPosts(posts);
//        postList.setCurrentPage(curPage);
//        postList.setTotalPageCount(1); // 확인 필요
//        return postList;
//    }

    @Override
    public PostResponse getPost(int postId) throws Exception {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        postRepository.addView(postId);
        return PostResponse.of(post);
    }

    @Override
    public String modifyPost(int postId, PostRequest postReq) throws Exception {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        if (post != null) {
            post.setTitle(postReq.getTitle());
            post.setContent(postReq.getContent());
            postRepository.save(post);
        }
        return postReq.getBoardId()+"번 게시판에 "+postReq.getPostId()+"번 게시글 수정";
    }

    @Override
    public String deletePost(int postId) throws Exception {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        postRepository.delete(post);
        return postId+"번 게시글 삭제";
    }

    @Override
    public String addLike(int postId, int userId) throws Exception {
        postRepository.addLike(postId,userId);
        return postId+"번 게시글 "+userId+"번 유저 좋아요 누름";
    }

    @Override
    public String removeLike(int postId, int userId) throws Exception {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        postRepository.removeLike(postId,userId);
        return postId+"번 게시글 "+userId+"번 유저 좋아요 취소";
    }

    @Override
    public Boolean checkLike(int postId, int userId) throws Exception {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        int count = postRepository.checkLike(postId,userId);
        return count==1;
    }
}