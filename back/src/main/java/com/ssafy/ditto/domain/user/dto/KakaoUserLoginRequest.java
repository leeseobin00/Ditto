package com.ssafy.ditto.domain.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KakaoUserLoginRequest {
    private String email;
    private String nickname;
}
