package com.ssafy.ditto.domain.mypage.domain;

import com.ssafy.ditto.domain.user.domain.User;
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
    private Integer accountId;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "bank")
    private String bank;

    @Column(name = "receiver")
    private String receiver;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void changeAccountNumber(String newAccountNumber){
        this.accountNumber = newAccountNumber;
    }

    public void changeBank(String newBank){
        this.bank = newBank;
    }

    public void changeReceiver(String newReceiver){
        this.receiver = newReceiver;
    }
}
