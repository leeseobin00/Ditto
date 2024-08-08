package com.ssafy.ditto.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@Schema(title = "Kakao User Info Response", description = "카카오 사용자 정보 응답")
public class KakaoUserInfoResponse {

    @Schema(description = "사용자 ID", example = "1234567890")
    private Long id;

    @Schema(description = "연결 시간", example = "2023-01-01T00:00:00")
    @JsonProperty("connected_at")
    private LocalDateTime connectedAt;

    @Schema(description = "카카오 계정 정보")
    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

    @Data
    @Builder
    @Schema(title = "Kakao Account", description = "카카오 계정 정보")
    public static class KakaoAccount {

        @Schema(description = "프로필 닉네임 동의 여부", example = "false")
        @JsonProperty("profile_nickname_needs_agreement")
        private Boolean profileNicknameNeedsAgreement;

        @Schema(description = "프로필 정보")
        private Profile profile;

        @Data
        @Schema(title = "Profile", description = "프로필 정보")
        public static class Profile {
            @Schema(description = "닉네임", example = "John Doe")
            private String nickname;
        }

        @Schema(description = "이메일 동의 여부", example = "false")
        @JsonProperty("email_needs_agreement")
        private Boolean emailNeedsAgreement;

        @Schema(description = "이메일 유효 여부", example = "true")
        @JsonProperty("is_email_valid")
        private Boolean isEmailValid;

        @Schema(description = "이메일 인증 여부", example = "true")
        @JsonProperty("is_email_verified")
        private Boolean isEmailVerified;

        @Schema(description = "이메일 주소", example = "example@example.com")
        private String email;
    }
}
