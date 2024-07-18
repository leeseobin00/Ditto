package com.ssafy.ditto.domain.question.domain;

import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;
import com.ssafy.ditto.domain.classes.domain.Class;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question extends BaseTimeEntity {
    @Id
    @GeneratedValue
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

    // FK
    private Integer userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private Class classId;
}
