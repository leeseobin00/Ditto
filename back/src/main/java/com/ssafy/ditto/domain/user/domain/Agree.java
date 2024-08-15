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
    private Integer agreeId;

    @Column(name = "agree", length = 4000)
    private String agree;
}
