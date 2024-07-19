package com.ssafy.ditto.domain.user.dto;

import io.lettuce.core.dynamic.annotation.Command;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;

@Data
@Schema(title = "POST : 강사 회원 가입", description = "강사 유저가 회원가입한다.")
public class ProSignUpRequest {
    private int role;
    private String email;
    private String nickname;
    private boolean agreeTOS;
    private boolean agreePICU;
    private String name;
    private String phoneNumber;
    private Date startDate;
    private int minActive;
    private String experience;
    private String comment;
}