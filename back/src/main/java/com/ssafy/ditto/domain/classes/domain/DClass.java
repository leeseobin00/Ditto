package com.ssafy.ditto.domain.classes.domain;

import com.ssafy.ditto.domain.category.domain.Category;
import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "d_class")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DClass extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kit_id")
    private Kit kit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = true)
    private File file;

    @OneToMany(mappedBy = "dclass", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Lecture> lectures;
}
