package com.ssafy.ditto.domain.comment.service;

import com.ssafy.ditto.domain.comment.domain.Comment;
import com.ssafy.ditto.domain.comment.dto.CommentRequest;
import com.ssafy.ditto.domain.comment.dto.CommentResponse;
import com.ssafy.ditto.domain.comment.exception.CommentException;
import com.ssafy.ditto.domain.comment.repository.CommentRepository;
import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.post.exception.PostException;
import com.ssafy.ditto.domain.post.repository.PostRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import com.ssafy.ditto.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private static final int MAX_COMMENT_LEVEL = 1;
    private static final String REMOVED_COMMENT = "삭제된 댓글입니다.";

    @Override
    @Transactional
    public String writeComment(int postId, CommentRequest commentReq) {
        User user = userRepository.findById(commentReq.getUserId()).orElse(null);
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(ErrorCode.POST_NOT_EXIST));
        Comment comment = new Comment();
        comment.setContent(commentReq.getContent());
        comment.setUser(user);
        comment.setPost(post);
        comment.setIsDeleted(false);
        comment.setLevel((byte)0);


        if(commentReq.getParentId() != -1) { // 대댓글인 경우
            Comment parent = getParent(postId, commentReq.getParentId());
            comment.addParent(parent);
            comment.setLevel((byte)(parent.getLevel()+1));
        }

        if(comment.getLevel() > MAX_COMMENT_LEVEL) { // 댓글 레벨 제한
            throw new CommentException(ErrorCode.COMMENT_LEVEL_EXCEED);
        }
        commentRepository.save(comment);
        int commentCnt = postRepository.countComments(post.getPostId());
        postRepository.commentCountUpdate(post.getPostId(),commentCnt);
        return comment.getCommentId()+"번 댓글 작성완료";
    }

    @Override
    @Transactional
    public List<CommentResponse> getCommentList(int postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(ErrorCode.POST_NOT_EXIST));
        List<Comment> commentList = commentRepository.findAllByPost_PostId(post.getPostId());

        List<CommentResponse> responseList = new ArrayList<>();
        Map<Integer, CommentResponse> root = new HashMap<>();
        for (Comment comment : commentList) {
            CommentResponse commentResp = new CommentResponse();
            commentResp.setCommentId(comment.getCommentId());
            if(comment.getParent()!=null)
                commentResp.setParentId(comment.getParent().getCommentId());
            commentResp.setUserId(comment.getUser().getUserId());
            commentResp.setNickname(comment.getUser().getNickname());
            commentResp.setFileId(comment.getUser().getFileId().getFileId());
            commentResp.setFileUrl(comment.getUser().getFileId().getFileUrl());
            commentResp.setContent(checkRemoved(comment));
            commentResp.setLevel(comment.getLevel());
            commentResp.setIsDeleted(comment.getIsDeleted());

            root.put(comment.getCommentId(), commentResp);

            if(comment.getParent() == null) responseList.add(commentResp);
            else  root.get(comment.getParent().getCommentId()).getChildren().add(commentResp);
        }
        return responseList;
    }

    @Override
    @Transactional
    public void modifyComment(int commentId, CommentRequest commentReq) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentException(ErrorCode.COMMENT_NOT_EXIST));

        if (comment.getIsDeleted()) {
            throw new CommentException(ErrorCode.CANNOT_MODIFY_DELETED_COMMENT);
        }

        comment.setContent(commentReq.getContent());
    }

    @Override
    @Transactional
    public void deleteComment(int commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentException(ErrorCode.COMMENT_NOT_EXIST));
        Post post = comment.getPost();

        if (comment.getLevel() == 0) { // 댓글
            if (hasActiveChildren(comment)) {
                comment.setContent(REMOVED_COMMENT);
                comment.setIsDeleted(true);
            } else {
                commentRepository.delete(comment);
            }
        } else { // 대댓글
            Comment parent = comment.getParent();
            comment.setIsDeleted(true);
            commentRepository.delete(comment);
            // 부모 댓글이 "삭제된 댓글"이고 더 이상 자식 댓글이 없으면 부모 댓글도 삭제
            checkAndDeleteParentComment(parent);
        }
        int commentCnt = postRepository.countComments(post.getPostId());
        postRepository.commentCountUpdate(post.getPostId(),commentCnt);
    }

    private boolean hasActiveChildren(Comment comment) {
        if(comment.getChildren().isEmpty()) return false;
        return comment.getChildren().stream().anyMatch(child -> !child.getIsDeleted());
    }

    private void checkAndDeleteParentComment(Comment parent) {
        if (parent != null && parent.getIsDeleted() && !hasActiveChildren(parent)) {
            deleteComment(parent.getCommentId());
        }
    }

    public Comment getParent(int postId, int parentId) {
        Comment parent = commentRepository.findById(parentId).orElseThrow(()-> new CommentException(ErrorCode.PARENT_COMMENT_NOT_EXIST));
        if(parent.getPost().getPostId() != postId) { // 부모와 자식 댓글의 게시글이 같은지 확인
            throw new CommentException(ErrorCode.COMMENT_NOT_SAME_POST);
        }
        return parent;
    }

    public String checkRemoved(Comment comment) {
        if(comment.getIsDeleted()) return REMOVED_COMMENT;
        return comment.getContent();
    }
}
