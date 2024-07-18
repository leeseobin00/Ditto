package com.ssafy.ditto.domain.review.domain;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.domain.Class;
import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review extends BaseTimeEntity {
    @Id
    @GeneratedValue
    @Column
    private Integer reviewId;

    @Column
    private String reviewContent;

    @Column
    private Boolean isDeleted;

    @Column
    private Byte rating;

    // FK
    private Integer userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private Class classId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lectureId;
}
