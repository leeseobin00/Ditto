package com.ssafy.ditto.domain.classes.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Payment {
    @Id
    @GeneratedValue
    @Column
    private Integer paymentId;

    @Column
    private LocalDateTime payTime;

    @Column
    private LocalDateTime payCancelTime;

    // 외래키
    private Integer userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lectureId;
}