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
    private Integer mileageId;

    @Column(name = "mileage")
    private Integer mileage;

    //FK
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void changeMileage(int newMileage){
        this.mileage = newMileage;
    }
}
