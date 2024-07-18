package com.ssafy.ditto.domain.classes.domain;

import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Lecture extends BaseTimeEntity {
    @Id
    @GeneratedValue
    @Column
    private Integer lectureId;

    @Column
    private Integer year;

    @Column
    private Byte month;

    @Column
    private Byte day;

    @Column
    private Byte hour;

    @Column
    private Byte minute;

    @Column
    private Byte userCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private Class classId;

    @Column
    private String className;

    @Column
    private Integer classPrice;

    @Column
    private Boolean isDeleted;
}