package com.ssafy.ditto.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "Kakao Token Response", description = "카카오 로그인 토큰 응답")
public class KakaoTokenResponse {

    @Schema(description = "토큰 타입", example = "bearer")
    @JsonProperty("token_type")
    private String tokenType;

    @Schema(description = "액세스 토큰", example = "abcdefghijk")
    @JsonProperty("access_token")
    private String accessToken;

    @Schema(description = "토큰 만료 시간", example = "21599")
    @JsonProperty("expires_in")
    private Integer expiresIn;

    @Schema(description = "리프레시 토큰", example = "lmnopqrstuvwxyz")
    @JsonProperty("refresh_token")
    private String refreshToken;

    @Schema(description = "리프레시 토큰 만료 시간", example = "5183999")
    @JsonProperty("refresh_token_expires_in")
    private String refreshTokenExpiresIn;
}
