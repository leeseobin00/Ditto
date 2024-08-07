package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MypageResponse {
    private String email;
    private String nickname;
    private Integer fileId;
    private String fileUrl;
    private List<AddressListResponse> addresses;
}
