package com.ssafy.ditto.domain.comment.repository;

import com.ssafy.ditto.domain.comment.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Integer> {
    // 게시물의 댓글 조회
    List<Comment> findAllByPost_PostId(int postId);
}
