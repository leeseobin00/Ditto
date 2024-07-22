package com.ssafy.ditto.global.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class JwtResponse {
    private final String accessToken;
    private final String refreshToken;
}