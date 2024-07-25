package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CancelResponse {
    private Integer refundId;
    private String refund;
}
