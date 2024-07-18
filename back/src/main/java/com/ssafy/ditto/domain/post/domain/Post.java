package com.ssafy.ditto.domain.post.domain;

import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Post")
public class Post extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Integer postId;

    @Column(name = "title", length = 100)
    private String title;

    @Column(name = "content", length = 3000)
    private String content;

    @Column(name = "view_count")
    private Integer viewCount;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "like_count")
    private Integer likeCount;

    @Column(name = "comment_count")
    private Integer commentCount;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "board_id")
    private Integer boardId;

    @Column(name = "tag_id")
    private Integer tagId;

    @Column(name = "category_id")
    private Integer categoryId;
}
