package com.ssafy.ditto.domain.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private final String accessToken;
    private final String refreshToken;
    private final String nickname;
}
