package com.ssafy.ditto.domain.classes.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Kit {
    @Id
    @GeneratedValue
    @Column
    private Integer kitId;

    @Column
    private String kitName;

    @Column
    private String kitExplanation;

    // FK
    private Integer fileId;
}