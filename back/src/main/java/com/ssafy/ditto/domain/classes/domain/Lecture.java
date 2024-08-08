package com.ssafy.ditto.domain.classes.domain;

import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "lecture")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Lecture extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_id")
    private Integer lectureId;

    @Column(name = "year")
    private Integer year;

    @Column(name = "month")
    private Byte month;

    @Column(name = "day")
    private Byte day;

    @Column(name = "hour")
    private Byte hour;

    @Column(name = "minute")
    private Byte minute;

    @Column(name = "user_count")
    private Byte userCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private DClass dClass;

    @Column(name = "class_name")
    private String className;

    @Column(name = "class_price")
    private Integer classPrice;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    public LocalDateTime getStartDateTime() {
        return LocalDateTime.of(year, month, day, hour, minute);
    }
}
