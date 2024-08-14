package com.ssafy.ditto.domain.post.service;

import java.time.LocalDateTime;
import java.util.*;

import com.ssafy.ditto.domain.category.domain.Category;
import com.ssafy.ditto.domain.category.exception.CategoryNotFoundException;
import com.ssafy.ditto.domain.category.repository.CategoryRepository;
import com.ssafy.ditto.domain.comment.domain.Comment;
import com.ssafy.ditto.domain.comment.repository.CommentRepository;
import com.ssafy.ditto.domain.comment.service.CommentService;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.file.repository.FileRepository;
import com.ssafy.ditto.domain.post.domain.Board;
import com.ssafy.ditto.domain.post.domain.LikePost;
import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.post.dto.PostRequest;
import com.ssafy.ditto.domain.post.dto.PostResponse;
import com.ssafy.ditto.domain.post.exception.PostException;
import com.ssafy.ditto.domain.post.repository.BoardRepository;
import com.ssafy.ditto.domain.post.repository.LikePostRepository;
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

@Component
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    public final PostRepository postRepository;
    public final LikePostRepository likePostRepository;
    public final BoardRepository boardRepository;
    public final CategoryRepository categoryRepository;
    public final TagRepository tagRepository;
    public final UserRepository userRepository;
    public final FileRepository fileRepository;
    public final CommentRepository commentRepository;
    public final CommentService commentService;

    @Override
    @Transactional
    public int writePost(PostRequest postReq) {
        Board board = boardRepository.findById(postReq.getBoardId())
                .orElseThrow(() -> new ServiceException(ErrorCode.BOARD_NOT_EXIST));
        Category category = categoryRepository.findById(postReq.getCategoryId())
                .orElseThrow(CategoryNotFoundException::new);
        Tag tag = tagRepository.findById(postReq.getTagId())
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

        // searchBy 는 null이 아니라면 "제목", "작성자" 중 하나로 들어옴
        String sb = map.get("searchBy") != null && !map.get("searchBy").isEmpty() ? map.get("searchBy"):null;
        String searchBy = null;
        if("제목".equals(sb)) searchBy = "p.title";
        if("작성자".equals(sb)) searchBy = "u.nickname";
        String keyword = map.get("keyword") != null && !map.get("keyword").isEmpty() ? map.get("keyword"):null;

        List<Post> list;
        int postCount;
        int pageCount;
        if(searchBy==null || keyword==null) {
            list = postRepository.getPostLists(boardId, categoryId, tagId);
            postCount = postRepository.getPostCount(boardId, categoryId, tagId);
            pageCount = (postCount - 1) / sizePage + 1;
        }
        else{
            list = postRepository.getPostLists(boardId, categoryId, tagId, searchBy, keyword);
            postCount = postRepository.getPostCount(boardId, categoryId, tagId, searchBy, keyword);
            pageCount = (postCount - 1) / sizePage + 1;
        }

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
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(ErrorCode.POST_NOT_EXIST));
        post.setViewCount(post.getViewCount()+1);
        postRepository.save(post);
        List<File> files = fileRepository.findByPostId(postId);

        PostResponse postResp = PostResponse.of(post);
        postResp.setFiles(files);
        return postResp;
    }

    @Override
    public void modifyPost(int postId, PostRequest postReq) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(ErrorCode.POST_NOT_EXIST));
        if (post != null) {
            post.setTitle(postReq.getTitle());
            post.setContent(postReq.getContent());
            postRepository.save(post);
        }
    }

    @Override
    @Transactional
    public void deletePost(int postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(ErrorCode.POST_NOT_EXIST));
        List<Comment> commentList = commentRepository.findAllByPost_PostId(postId);

        commentList.sort((c1, c2) -> c2.getLevel() - c1.getLevel());
        for(Comment comment:commentList){
            comment.setIsDeleted(true);
            commentRepository.save(comment);
        }
        post.setIsDeleted(true);
        postRepository.save(post);
    }

    @Override
    public void addLike(int postId, int userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(ErrorCode.POST_NOT_EXIST));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException(ErrorCode.USER_NOT_FOUND));
        Optional<LikePost> likePostList = likePostRepository.findByUserAndPost(user,post);
        if(likePostList.isEmpty()) {
            // 좋아요를 추가 및 업데이트
            postRepository.addLike(postId, userId);
            int likeCount = postRepository.countLikes(postId);
            postRepository.likeCountUpdate(postId, likeCount);
        }
    }

    @Override
    public void removeLike(int postId, int userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(ErrorCode.POST_NOT_EXIST));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException(ErrorCode.USER_NOT_FOUND));
        Optional<LikePost> likePostList = likePostRepository.findByUserAndPost(user,post);
        if(likePostList.isPresent()) {
            // 좋아요를 제거 및 업데이트
            postRepository.removeLike(postId, userId);
            int likeCount = postRepository.countLikes(postId);
            postRepository.likeCountUpdate(postId, likeCount);
        }
    }

    @Override
    public Boolean checkLike(int postId, int userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(ErrorCode.POST_NOT_EXIST));
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException(ErrorCode.USER_NOT_FOUND));
        return likePostRepository.findByUserAndPost(user,post).isPresent();
    }
}