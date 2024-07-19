package com.ssafy.ditto.domain.mypage.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Refund")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refund_id")
    private int refundId;

    @Column(name = "refund")
    private String refund;
}