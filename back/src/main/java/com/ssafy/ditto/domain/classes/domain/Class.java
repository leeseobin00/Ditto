package com.ssafy.ditto.domain.classes.domain;

import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Class extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer classId;

    @Column(length = 50)
    private String className;

    @Column
    private Integer classPrice;

    @Column
    private Byte classHour;

    @Column
    private Byte classMinute;

    @Column(length = 3000)
    private String classExplanation;

    @Column
    private Byte classMin;

    @Column
    private Byte classMax;

    @Column
    private Integer studentSum;

    @Column
    private Integer likeCount;

    @Column
    private Integer reviewCount;

    @Column
    private Integer ratingSum;

    @Column
    private Boolean isDeleted;

    // FK
    private Integer userId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tagId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kit_id")
    private Kit kitId;

    // FK
    private Integer fileId;
}