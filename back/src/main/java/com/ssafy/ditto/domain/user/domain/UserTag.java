package com.ssafy.ditto.domain.user.domain;

import com.ssafy.ditto.domain.tag.domain.Tag;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "UserTag")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_tag_id")
    private Integer userTagId;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tagId;
}
