package com.ssafy.ditto.domain.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "POST : 로그인", description = "유저가 로그인한다.")
public class UserLoginRequest {

    @Schema(description = "이메일 주소", example = "example@example.com")
    private String email;

    @Schema(description = "비밀번호", example = "password123")
    private String password;
}
