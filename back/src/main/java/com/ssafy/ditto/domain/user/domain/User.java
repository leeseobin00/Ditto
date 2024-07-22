package com.ssafy.ditto.domain.user.domain;

import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "User")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "nickname", nullable = false, unique = true)
    private String nickname;

    @Column(name = "agree_TOS", nullable = false)
    private boolean agreeTOS;

    @Column(name = "agree_PICU", nullable = false)
    private boolean agreePICU;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Column(name = "intro")
    private String intro;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "domain")
    private String domain;

    //FK
    private int fileId;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private UserRole roleId;
}