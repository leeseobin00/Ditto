package com.ssafy.ditto.domain.user.dto;

import io.lettuce.core.dynamic.annotation.Command;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Schema(title = "POST : 강사 회원 가입", description = "강사 유저가 회원가입한다.")
public class ProSignUpRequest {
    private String email;
    private String password;
    private String nickname;
    private int role;
    private String name;
    private String phoneNumber;
    private LocalDateTime startDate;
    private Byte minActive;
    private String experience;
    private String comment;
    private boolean agreeTOS;
    private boolean agreePICU;
    private List<String> tagName;
}