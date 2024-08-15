package com.ssafy.ditto.domain.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "POST : 일반 회원 가입", description = "일반 유저가 회원가입한다.")
public class UserSignUpRequest {

    @Schema(description = "이메일 주소", example = "example@example.com")
    private String email;

    @Schema(description = "비밀번호", example = "password123")
    private String password;

    @Schema(description = "닉네임", example = "SSAFY")
    private String nickname;

    @Schema(description = "역할 ID", example = "1")
    private Integer role;

    @Schema(description = "이용약관 동의 여부", example = "true")
    private Boolean agreeTOS;

    @Schema(description = "개인정보 처리방침 동의 여부", example = "true")
    private Boolean agreePICU;
}
