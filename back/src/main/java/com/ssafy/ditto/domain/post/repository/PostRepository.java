package com.ssafy.ditto.domain.post.repository;

import com.ssafy.ditto.domain.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Integer>{

    // 커뮤니티 게시글 목록 조회
    @Query(value = "SELECT * FROM Post p WHERE "
            + "(:boardId IS NULL OR p.board_id = :boardId) AND "
            + "(:categoryId IS NULL OR p.category_id = :categoryId) AND "
            + "(:tagId IS NULL OR p.tag_id = :tagId) "
            + "ORDER BY :sortBy DESC "
            + "LIMIT :start, :listSize", nativeQuery = true)
    List<Post> getlist(@Param("boardId") Integer boardId, @Param("categoryId") Integer categoryId,
                       @Param("tagId") Integer tagId, @Param("sortBy") String sortBy,
                       @Param("start") int start, @Param("listSize") int listSize);


    @Query(value = "SELECT COUNT(*) FROM Post p WHERE "
            + "(:boardId IS NULL OR p.board_id = :boardId) AND "
            + "(:categoryId IS NULL OR p.category_id = :categoryId) AND "
            + "(:tagId IS NULL OR p.tag_id = :tagId)", nativeQuery = true)
    int getPostCount(@Param("boardId") Integer boardId, @Param("categoryId") Integer categoryId,
                     @Param("tagId") Integer tagId);

    // 최근 1주일간 받은 좋아요수
    @Query(value = "SELECT p.* FROM Post p " +
            "LEFT JOIN Like_Post l ON p.post_id = l.post_id " +
            "WHERE l.created_date > :oneWeekAgo " +
            "GROUP BY p.post_id " +
            "ORDER BY COUNT(l.post_id) DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Post> getBestPosts(@Param("oneWeekAgo") LocalDateTime oneWeekAgo);


    List<Post> findByUserId(int userId);

    // 커뮤니티 게시글 상세 조회
    @Query("SELECT p FROM Post p WHERE p.postId = :postId")
    Post getPost(@Param("postId") int postId);

    // 조회수 +1
    @Transactional
    @Query("UPDATE Post p SET p.view_count = p.view_count + 1 WHERE p.post_id = :postId")
    void addView(@Param("postId") int postId);

    // 좋아요 추가
    @Transactional
    @Query(value = "INSERT INTO Like_Post (post_id, user_id) VALUES (:postId, :userId)", nativeQuery = true)
    void addLike(@Param("postId") int postId, @Param("userId") int userId);

    // 좋아요 삭제
    @Transactional
    @Query(value = "DELETE FROM Like_Post WHERE post_id = :postId AND user_id = :userId", nativeQuery = true)
    void removeLike(@Param("postId") int postId, @Param("userId") int userId);

    // 좋아요 상태 확인
    @Query(value = "SELECT COUNT(*) FROM Like_Post WHERE post_id = :postId AND user_id = :userId", nativeQuery = true)
    int checkLike(@Param("postId") int postId, @Param("userId") int userId);

}
