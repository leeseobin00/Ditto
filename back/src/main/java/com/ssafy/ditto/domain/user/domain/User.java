package com.ssafy.ditto.domain.user.domain;

import com.ssafy.ditto.domain.file.domain.File;
import com.ssafy.ditto.domain.tag.domain.Tag;
import com.ssafy.ditto.global.shared.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
    private Integer userId;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "nickname", nullable = false, unique = true)
    private String nickname;

    @Column(name = "agree_TOS", nullable = false)
    private Boolean agreeTOS;

    @Column(name = "agree_PICU", nullable = false)
    private Boolean agreePICU;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "intro")
    private String intro;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "domain")
    private String domain;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")
    private File fileId;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private UserRole roleId;

    public void changePassword(String newPassword){
        this.password = newPassword;
    }

    public void changeNickname(String newNickname){
        this.nickname = newNickname;
    }

    public void changeRefreshToken(String newRefreshToken){
        this.refreshToken = newRefreshToken;
    }

    public void changeFile(File newFile) {
        this.fileId = newFile;
    }

    public void updateIntro(String newIntro) {
        this.intro = newIntro;
    }
}