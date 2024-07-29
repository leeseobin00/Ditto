package com.ssafy.ditto.domain.post.repository;

import com.ssafy.ditto.domain.post.domain.LikePost;
import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LikePostRepository extends JpaRepository<LikePost,Integer> {
    @Query("SELECT lp FROM LikePost lp WHERE lp.user = :user AND lp.post = :post")
    Optional<LikePost> findByUserAndPost(@Param("user") User user, @Param("post") Post post);
}
