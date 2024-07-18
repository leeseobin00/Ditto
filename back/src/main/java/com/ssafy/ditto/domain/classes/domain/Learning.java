package com.ssafy.ditto.domain.classes.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Learning {
    @Id
    @GeneratedValue
    @Column
    private Integer learningId;

    // FK
    private Integer chatroomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private Class classId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lectureId;

    // FK
    private Integer studentId;

    // FK
    private Integer teacherId;

    @Column
    private Boolean isFinished;

}
