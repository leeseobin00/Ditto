package com.ssafy.ditto.domain.mypage.domain;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

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
    private int historyId;

    @Column(name = "mileage_amount")
    private int mileageAmount;

    @Column(name = "time")
    private Date time;

    @Column(name = "state")
    private int state;

    @Column(name = "final_amount")
    private int finalAmount;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mileage_id")
    private Mileage mileageId;

    //FK
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lectureId;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;
}
