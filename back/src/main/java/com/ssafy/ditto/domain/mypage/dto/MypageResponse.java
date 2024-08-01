package com.ssafy.ditto.domain.mypage.dto;

import com.ssafy.ditto.domain.mypage.domain.Address;
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
    private List<Address> addresses;
}
