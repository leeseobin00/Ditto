package com.ssafy.ditto.domain.post.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

import com.ssafy.ditto.domain.category.domain.Category;
import com.ssafy.ditto.domain.category.exception.CategoryNotFoundException;
import com.ssafy.ditto.domain.category.repository.CategoryRepository;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.file.dto.UploadFile;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.file.service.FileService;
import com.ssafy.ditto.domain.post.domain.Board;
import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.post.dto.PostRequest;
import com.ssafy.ditto.domain.post.dto.PostResponse;
import com.ssafy.ditto.domain.post.exception.BoardException;
import com.ssafy.ditto.domain.post.exception.PostException;
import com.ssafy.ditto.domain.post.repository.BoardRepository;
import com.ssafy.ditto.domain.post.repository.PostRepository;
import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.domain.tag.exception.TagNotFoundException;
import com.ssafy.ditto.domain.tag.repository.TagRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import com.ssafy.ditto.global.error.ErrorCode;
import com.ssafy.ditto.global.error.ServiceException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.ditto.domain.post.dto.PostList;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.ditto.domain.post.exception.BoardErrorCode.*;
import static com.ssafy.ditto.domain.post.exception.PostErrorCode.*;

@Component
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    public final PostRepository postRepository;
    public final BoardRepository boardRepository;
    public final CategoryRepository categoryRepository;
    public final TagRepository tagRepository;
    public final UserRepository userRepository;
    public final FileRepository fileRepository;

    @Override
    @Transactional
    public int writePost(PostRequest postReq) {
        Board board = boardRepository.findById(postReq.getBoardId())
                .orElseThrow(() -> new BoardException(BOARD_NOT_EXIST));
        System.out.println(board);
        Category category = categoryRepository.findById(postReq.getCategoryId())
                .orElseThrow(CategoryNotFoundException::new);
        Tag tag = tagRepository.findById(postReq.getCategoryId())
                .orElseThrow(TagNotFoundException::new);
        User user = userRepository.findById(postReq.getUserId())
                .orElseThrow(() -> new ServiceException(ErrorCode.USER_NOT_FOUND));

        Post post = new Post();
        post.setTitle(postReq.getTitle());
        post.setContent(postReq.getContent());
        post.setUser(user);
        post.setBoard(board);
        post.setCategory(category);
        post.setTag(tag);
        post.setViewCount(0);
        post.setIsDeleted(false);
        post.setLikeCount(0);
        post.setCommentCount(0);

        postRepository.save(post);

        return post.getPostId();
    }

    @Override
    public PostList searchPost(Map<String, String> map) {
        int curPage = Integer.parseInt(map.getOrDefault("page", "1"));
        int sizePage = Integer.parseInt(map.getOrDefault("size", "10"));
        int start = (curPage - 1) * sizePage;

        Integer boardId = map.get("boardId") != null && !map.get("boardId").isEmpty() ? Integer.parseInt(map.get("boardId")) : null;
        Integer categoryId = map.get("categoryId") != null && !map.get("categoryId").isEmpty() ? Integer.parseInt(map.get("categoryId")) : null;
        Integer tagId = map.get("tagId") != null && !map.get("tagId").isEmpty() ? Integer.parseInt(map.get("tagId")) : null;
        String sortBy = map.getOrDefault("sortBy", "postId");

        List<Post> list = postRepository.getPostLists(boardId, categoryId, tagId);
        int postCount = postRepository.getPostCount(boardId, categoryId, tagId);
        int pageCount = (postCount - 1) / sizePage + 1;

        // Sort
        switch (sortBy) {
            case "likeCount":
                list.sort(Comparator.comparing(Post::getLikeCount).reversed());
                break;
            case "viewCount":
                list.sort(Comparator.comparing(Post::getViewCount).reversed());
                break;
            case "createdDate":
                list.sort(Comparator.comparing(Post::getCreatedDate).reversed());
                break;
            case "postId":
            default:
                list.sort(Comparator.comparing(Post::getPostId).reversed());
                break;
        }

        // Pagination
        List<Post> paginatedList;
        if (start >= list.size()) {
            paginatedList = Collections.emptyList();
        } else {
            int end = Math.min(start + sizePage, list.size());
            paginatedList = list.subList(start, end);
        }

        PostList postList = new PostList();
        for (Post post : paginatedList) {
            postList.getPosts().add(PostResponse.of(post));
        }
        postList.setCurrentPage(curPage);
        postList.setTotalPageCount(pageCount);
        return postList;
    }

    @Override
    public PostList bestPost() {
        List<Post> list = postRepository.getBestPosts(LocalDateTime.now().minusDays(7));
        PostList postList = new PostList();
        for(Post post:list){
            postList.getPosts().add(PostResponse.of(post));
        }
        return postList;
    }

    @Override
    public PostList userPost(int userId, Map<String, String> map) {
        int curPage = Integer.parseInt(map.getOrDefault("page", "1"));
        int sizePage = Integer.parseInt(map.getOrDefault("size", "10"));
        int start = (curPage - 1) * sizePage;

        List<Post> list = postRepository.getUserPosts(userId);
        int postCount = list.size();
        int pageCount = (postCount - 1) / sizePage + 1;

        List<Post> paginatedList;
        if (start >= list.size()) {
            paginatedList = Collections.emptyList();
        } else {
            int end = Math.min(start + sizePage, list.size());
            paginatedList = list.subList(start, end);
        }

        PostList postList = new PostList();
        for (Post post : paginatedList) {
            postList.getPosts().add(PostResponse.of(post));
        }
        postList.setCurrentPage(curPage);
        postList.setTotalPageCount(pageCount);
        return postList;
    }

    @Override
    public PostResponse getPost(int postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        List<File> files = fileRepository.findByPostId(postId);
        postRepository.addView(postId);

        PostResponse postResp = PostResponse.of(post);
        postResp.setFiles(files);
        return postResp;
    }

    @Override
    public String modifyPost(int postId, PostRequest postReq) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        if (post != null) {
            post.setTitle(postReq.getTitle());
            post.setContent(postReq.getContent());
            postRepository.save(post);
        }

        return postReq.getBoardId()+"번 게시판에 "+postId+"번 게시글 수정";
    }

    @Override
    public String deletePost(int postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        postRepository.delete(post);

        return postId+"번 게시글 삭제";
    }

    @Override
    public String addLike(int postId, int userId) {
        postRepository.addLike(postId,userId);
        return postId+"번 게시글 "+userId+"번 유저 좋아요 누름";
    }

    @Override
    public String removeLike(int postId, int userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        postRepository.removeLike(postId,userId);
        return postId+"번 게시글 "+userId+"번 유저 좋아요 취소";
    }

    @Override
    public Boolean checkLike(int postId, int userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        int count = postRepository.checkLike(postId,userId);
        return count==1;
    }
}