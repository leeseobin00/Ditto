package com.ssafy.ditto.domain.classes.domain;

import com.ssafy.ditto.domain.file.domain.File;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private DClass classId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = true)
    private File fileId;
}
