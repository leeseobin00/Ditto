package com.ssafy.ditto.domain.classes.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "Summary")
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Summary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "summary_id")
    private Integer summaryId;

    @Column(name = "summary_content")
    private String summaryContent;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Integer lectureId;

    //FK
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id")
    private Integer stepId;
}
