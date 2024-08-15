package com.ssafy.ditto.domain.question.domain;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer questionId;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private Boolean isDeleted;

    @Column
    private Boolean isAnswered;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private DClass dclass;

    public void changeIsDeleted(Boolean newBoolean) {
        this.isDeleted = newBoolean;
    }

    public void changeIsAnswered(Boolean newBoolean) {
        this.isAnswered = newBoolean;
    }
}
