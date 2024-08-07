package com.ssafy.ditto.domain.summary.domain;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.domain.Step;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "Summary")
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Summary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "summary_id")
    private Integer summaryId;

    @Column(name = "summary_content", length = 2000)
    private String summaryContent;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "step_id")
    private Step step;
}
