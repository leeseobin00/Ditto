package com.ssafy.ditto.domain.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "Kakao User Login Request", description = "카카오 사용자 로그인 요청")
public class KakaoUserLoginRequest {

    @Schema(description = "이메일 주소", example = "example@example.com")
    private String email;

    @Schema(description = "닉네임", example = "SSAFY")
    private String nickname;
}
