package com.ssafy.ditto.domain.payment.domain;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.payment.dto.PayType;
import com.ssafy.ditto.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Table
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer paymentId;

    @Column
    private LocalDateTime payTime;

    @Column
    private LocalDateTime payCancelTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @Column(nullable = false, name = "pay_type")
    @Enumerated(EnumType.STRING)
    private PayType payType;

    @Column(nullable = false, name = "pay_amount")
    private Long amount;

    @Column(nullable = false, name = "pay_name")
    private String orderName;

    @Column(nullable = false, name = "order_id")
    private String orderId;

    private Boolean isPaySuccess;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String paymentKey;

    @Column
    private String failReason;

    @Column
    private Boolean isCanceled;

    @Column
    private String cancelReason;
}
