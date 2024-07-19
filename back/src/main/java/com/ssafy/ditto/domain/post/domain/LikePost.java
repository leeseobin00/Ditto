package com.ssafy.ditto.domain.post.domain;

import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Like_Post")
public class LikePost extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_post_id")
    private int likePostId;

    @Column(name = "post_id")
    private int postId;

    @Column(name = "user_id")
    private int userId;
}
