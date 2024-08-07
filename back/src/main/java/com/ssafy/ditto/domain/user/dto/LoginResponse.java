package com.ssafy.ditto.domain.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "Login Response", description = "로그인 응답")
public class LoginResponse {

    @Schema(description = "액세스 토큰", example = "abcdefghijk")
    private final String accessToken;

    @Schema(description = "리프레시 토큰", example = "lmnopqrstuvwxyz")
    private final String refreshToken;

    @Schema(description = "닉네임", example = "SSAFY")
    private final String nickname;

    @Schema(description = "역할 ID", example = "1")
    private final Integer roleId;

    @Schema(description = "도메인", example = "local")
    private final String domain;
}
