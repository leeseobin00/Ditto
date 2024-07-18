package com.ssafy.ditto.domain.answer.domain;

import com.ssafy.ditto.domain.question.domain.Question;
import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Answer extends BaseTimeEntity {
    @Id
    @GeneratedValue
    @Column
    private Integer answerId;

    @Column
    private String answer;

    @Column
    private Boolean isDeleted;

    // FK
    private Integer userId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question questionId;
}
