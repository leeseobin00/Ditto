package com.ssafy.ditto.domain.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "POST : 일반 회원 가입", description = "일반 유저가 회원가입한다.")
public class UserSignUpRequest {
    private String email;
    private String password;
    private String nickname;
    private Integer role;
    private Boolean agreeTOS;
    private Boolean agreePICU;
}
