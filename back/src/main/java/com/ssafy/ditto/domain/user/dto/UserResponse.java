package com.ssafy.ditto.domain.user.dto;

import com.ssafy.ditto.domain.user.domain.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(title = "User Response", description = "사용자 응답")
public class UserResponse {

    @Schema(description = "사용자 ID", example = "1")
    private Integer userId;

    @Schema(description = "닉네임", example = "SSAFY")
    private String nickname;

    public static UserResponse of(User user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .build();
    }
}
