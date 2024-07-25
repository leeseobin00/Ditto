package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MileageResponse {
    private Integer mileage;
    private String accountNumber;
    private String bank;
    private String receiver;
}
