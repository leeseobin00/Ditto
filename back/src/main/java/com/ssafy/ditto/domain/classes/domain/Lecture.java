package com.ssafy.ditto.domain.classes.domain;

import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Lecture extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private DClass classId;

    @Column
    private String className;

    @Column
    private Integer classPrice;

    @Column
    private Boolean isDeleted;

    @Column(name = "is_finished")
    private Boolean isFinished;

    public LocalDateTime getStartDateTime() {
        return LocalDateTime.of(year, month, day, hour, minute);
    }
}