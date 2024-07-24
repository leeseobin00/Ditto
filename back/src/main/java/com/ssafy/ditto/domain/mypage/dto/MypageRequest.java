package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MypageRequest {
    private String password;
    private String nickname;
}
