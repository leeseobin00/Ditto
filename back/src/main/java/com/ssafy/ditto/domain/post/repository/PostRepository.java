package com.ssafy.ditto.domain.post.repository;

import com.ssafy.ditto.domain.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Integer>{

    @Query(value = "SELECT p.* FROM Post p "
            + "JOIN User u ON p.user_id = u.user_id "
            + "WHERE (:boardId IS NULL OR p.board_id = :boardId) AND "
            + "(:categoryId IS NULL OR p.category_id = :categoryId) AND "
            + "(:tagId IS NULL OR p.tag_id = :tagId) AND "
            + "(p.is_deleted = FALSE) AND "
            + "(CASE WHEN :searchBy = 'p.title' THEN p.title LIKE %:keyword% "
            + "WHEN :searchBy = 'u.nickname' THEN u.nickname LIKE %:keyword% "
            + "ELSE TRUE END)",
            nativeQuery = true)
    List<Post> getPostLists(@Param("boardId") Integer boardId,
                            @Param("categoryId") Integer categoryId,
                            @Param("tagId") Integer tagId,
                            @Param("searchBy") String searchBy,
                            @Param("keyword") String keyword);

    @Query(value = "SELECT p.* FROM Post p "
            + "JOIN User u ON p.user_id = u.user_id "
            + "WHERE (:boardId IS NULL OR p.board_id = :boardId) AND "
            + "(:categoryId IS NULL OR p.category_id = :categoryId) AND "
            + "(:tagId IS NULL OR p.tag_id = :tagId) AND"
            + "(p.is_deleted = FALSE)",
            nativeQuery = true)
    List<Post> getPostLists(@Param("boardId") Integer boardId,
                            @Param("categoryId") Integer categoryId,
                            @Param("tagId") Integer tagId);


    @Query(value = "SELECT COUNT(*) FROM Post p "
            + "JOIN User u ON p.user_id = u.user_id "
            + "WHERE (:boardId IS NULL OR p.board_id = :boardId) AND "
            + "(:categoryId IS NULL OR p.category_id = :categoryId) AND "
            + "(:tagId IS NULL OR p.tag_id = :tagId) AND "
            + "(p.is_deleted = FALSE) AND "
            + "(CASE WHEN :searchBy = 'p.title' THEN p.title LIKE %:keyword% "
            + "WHEN :searchBy = 'u.nickname' THEN u.nickname LIKE %:keyword% "
            + "ELSE TRUE END)",
            nativeQuery = true)
    int getPostCount(@Param("boardId") Integer boardId,
                     @Param("categoryId") Integer categoryId,
                     @Param("tagId") Integer tagId,
                     @Param("searchBy") String searchBy,
                     @Param("keyword") String keyword);

    @Query(value = "SELECT COUNT(*) FROM Post p "
            + "JOIN User u ON p.user_id = u.user_id "
            + "WHERE (:boardId IS NULL OR p.board_id = :boardId) AND "
            + "(:categoryId IS NULL OR p.category_id = :categoryId) AND "
            + "(:tagId IS NULL OR p.tag_id = :tagId) AND"
            + "(p.is_deleted = FALSE)",
            nativeQuery = true)
    int getPostCount(@Param("boardId") Integer boardId,
                     @Param("categoryId") Integer categoryId,
                     @Param("tagId") Integer tagId);


    // 최근 1주일간 받은 좋아요 수
    @Query(value = "SELECT p.* FROM Post p " +
            "LEFT JOIN Like_Post l ON p.post_id = l.post_id " +
            "WHERE p.is_deleted = FALSE AND  l.created_date > :oneWeekAgo " +
            "GROUP BY p.post_id " +
            "ORDER BY COUNT(l.post_id) DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Post> getBestPosts(@Param("oneWeekAgo") LocalDateTime oneWeekAgo);

    @Query("SELECT p FROM Post p WHERE p.user.userId = :userId AND (p.isDeleted = FALSE)")
    List<Post> getUserPosts(@Param("userId") int userId);

    // 좋아요 추가
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Like_Post (post_id, user_id, created_date) VALUES (:postId, :userId, now())", nativeQuery = true)
    void addLike(@Param("postId") int postId, @Param("userId") int userId);

    // 좋아요 삭제
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Like_Post WHERE post_id = :postId AND user_id = :userId", nativeQuery = true)
    void removeLike(@Param("postId") int postId, @Param("userId") int userId);

    @Query(value = "SELECT COUNT(*) FROM Like_Post WHERE post_id = :postId", nativeQuery = true)
    int countLikes(@Param("postId") int postId);

    @Modifying
    @Transactional
    @Query("UPDATE Post p SET p.likeCount = :likeCount WHERE p.id = :postId")
    void likeCountUpdate(@Param("postId") int postId, @Param("likeCount") int likeCount);

    @Query(value = "SELECT COUNT(*) FROM Comment WHERE post_id = :postId", nativeQuery = true)
    int countComments(@Param("postId") int postId);

    @Modifying
    @Transactional
    @Query("UPDATE Post p SET p.commentCount = :commentCount WHERE p.id = :postId")
    void commentCountUpdate(@Param("postId") int postId, @Param("commentCount") int commentCount);
}
