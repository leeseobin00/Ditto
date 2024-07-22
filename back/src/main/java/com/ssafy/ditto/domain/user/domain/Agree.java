package com.ssafy.ditto.domain.user.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Agree")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Agree {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agree_id")
    private int agreeId;

    @Column(name = "agree")
    private String agree;
}
