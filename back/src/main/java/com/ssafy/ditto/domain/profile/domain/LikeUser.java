package com.ssafy.ditto.domain.profile.domain;

import com.ssafy.ditto.domain.post.domain.Post;
import com.ssafy.ditto.domain.user.domain.User;
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
@Table(name = "Like_User")
public class LikeUser extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_user_id")
    private Integer likeUserId;

    @ManyToOne
    @JoinColumn(name = "like_giver_id", nullable = false)
    private User likeGiver;

    @ManyToOne
    @JoinColumn(name = "like_getter_id", nullable = false)
    private User likeGetter;

    public LikeUser(User likeGetter, User likeGiver){
        this.likeGetter=likeGetter;
        this.likeGiver=likeGiver;
    }
}
