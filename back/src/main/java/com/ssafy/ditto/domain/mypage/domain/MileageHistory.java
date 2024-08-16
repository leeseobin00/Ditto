package com.ssafy.ditto.domain.mypage.domain;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "MileageHistory")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MileageHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Integer historyId;

    @Column(name = "mileage_amount")
    private Integer mileageAmount;

    @Column(name = "time")
    private LocalDateTime time;

    @Column(name = "state")
    private Integer state;

    @Column(name = "final_amount")
    private Integer finalAmount;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mileage_id")
    private Mileage mileage;

    //FK
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
