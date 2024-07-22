package com.ssafy.ditto.domain.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "Post : 로그인", description = "유저가 로그인한다.")
public class UserLoginRequest {
    private String email;
    private String password;
}
