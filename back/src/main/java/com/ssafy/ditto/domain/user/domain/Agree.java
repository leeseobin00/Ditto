package com.ssafy.ditto.domain.user.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "User")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Agree {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agree_id")
    private int agreeId;

    @Column(name = "agree1")
    private String agree1;

    @Column(name = "agree2")
    private String agree2;
}
