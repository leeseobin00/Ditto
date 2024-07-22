package com.ssafy.ditto.domain.classes.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Kit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer kitId;

    @Column
    private String kitName;

    @Column
    private String kitExplanation;

    // FK
    private Integer fileId;
}