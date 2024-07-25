package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProMypageResponse {
    private String email;
    private String nickname;
    private String fileUrl;
    private Integer accountId;
    private String accountNumber;
    private String bank;
    private String receiver;
}
