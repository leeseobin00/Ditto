package com.ssafy.ditto.domain.classes.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Step {
    @Id
    @GeneratedValue
    @Column
    private Integer stepId;

    @Column
    private Byte stepNo;

    @Column
    private String stepName;

    @Column
    private String stepDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private Class classId;

    //FK
    private Integer fileId;
}