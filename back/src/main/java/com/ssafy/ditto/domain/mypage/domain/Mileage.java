package com.ssafy.ditto.domain.mypage.domain;

import com.ssafy.ditto.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Mileage")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Mileage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mileage_id")
    private int mileageId;

    @Column(name = "mileage")
    private int mileage;

    //FK
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;
}
