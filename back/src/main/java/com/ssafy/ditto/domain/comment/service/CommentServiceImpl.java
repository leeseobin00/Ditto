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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ssafy.ditto.domain.comment.exception.CommentErrorCode.*;
import static com.ssafy.ditto.domain.post.exception.PostErrorCode.POST_NOT_EXIST;

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
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
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
            throw new CommentException(COMMENT_LEVEL_EXCEED);
        }
        commentRepository.save(comment);
        return comment.getCommentId()+"번 댓글 작성 완료";
    }

    @Override
    public List<CommentResponse> getCommentList(int postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostException(POST_NOT_EXIST));
        List<Comment> commentList = commentRepository.findAllByPost_PostId(post.getPostId());

        List<CommentResponse> responseList = new ArrayList<>();
        Map<Integer, CommentResponse> parent = new HashMap<>();
        for (Comment comment : commentList) {
            CommentResponse commentResp = new CommentResponse();
            commentResp.setCommentId(comment.getCommentId());
            commentResp.setParentId(comment.getParent().getCommentId());
            commentResp.setUserId(comment.getUser().getUserId());
            commentResp.setNickname(comment.getUser().getNickname());
            commentResp.setContent(checkRemoved(comment));
            commentResp.setLevel(comment.getLevel());
            commentResp.setIsDeleted(comment.getIsDeleted());

            parent.put(comment.getCommentId(), commentResp);

            if(comment.getParent() == null) responseList.add(commentResp);
            else  parent.get(comment.getParent().getCommentId()).getChildren().add(commentResp);
        }
        return responseList;
    }

    @Override
    public String modifyComment(int commentId, CommentRequest commentReq) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new CommentException(COMMENT_NOT_EXIST));
        comment.setContent(commentReq.getContent());
        return comment.getCommentId()+"번 댓글 수정";
    }

    @Override
    public String deleteComment(int commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new CommentException(COMMENT_NOT_EXIST));
        comment.setIsDeleted(true);
        deleteRootComment(comment);
        return comment.getCommentId()+"번 댓글 삭제";
    }

    public Comment findRootComment(Comment child) {
        if(child.getParent() == null) return child;
        return findRootComment(child.getParent());
    }

    public void deleteRootComment(Comment comment) {
        Comment root = findRootComment(comment);
        if(!root.getIsDeleted()) return;
        int cnt = countNotRemovedChild(root);
        if(cnt == 0) {
            commentRepository.deleteById(root.getCommentId());
        }
    }

    public int countNotRemovedChild(Comment parent) {
        if(parent == null) return 0;

        int childcnt = 0;
        if(!parent.getChildren().isEmpty()){
            for(Comment child:parent.getChildren()){
                if(!child.getIsDeleted()) childcnt++;
                childcnt+=countNotRemovedChild(child);
            }
        }
        return childcnt;
    }

    public Comment getParent(int postId, int parentId) {
        Comment parent = commentRepository.findById(parentId).orElseThrow(()-> new CommentException(PARENT_COMMENT_NOT_EXIST));
        if(parent.getPost().getPostId() != postId) { // 부모와 자식 댓글의 게시글이 같은지 확인
            throw new CommentException(COMMENT_NOT_SAME_POST);
        }
        return parent;
    }

    public String checkRemoved(Comment comment) {
        if(comment.getIsDeleted()) return REMOVED_COMMENT;
        return comment.getContent();
    }
}
