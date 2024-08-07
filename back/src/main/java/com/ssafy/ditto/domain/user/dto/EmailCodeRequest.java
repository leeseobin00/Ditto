package com.ssafy.ditto.domain.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "POST : 이메일 인증코드 확인", description = "이메일 인증코드 확인")
public class EmailCodeRequest {

    @Schema(description = "이메일 주소", example = "example@example.com")
    private String email;

    @Schema(description = "인증 코드", example = "123456")
    private String code;
}
