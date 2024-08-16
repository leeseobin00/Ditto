package com.ssafy.ditto.domain.answer.domain;

import com.ssafy.ditto.domain.question.domain.Question;
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
public class Answer extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer answerId;

    @Column
    private String answer;

    @Column
    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    public void changeAnswer(String newAnswer) {
        this.answer = newAnswer;
    }

    public void changeIsDeleted(Boolean newBoolean) {
        this.isDeleted = newBoolean;
    }
}
