package com.ssafy.ditto.domain.user.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Account")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private int accountId;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "bank")
    private String bank;

    @Column(name = "receiver")
    private String receiver;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;
}
