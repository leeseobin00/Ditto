package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MilageHistoryResponse {
    private Integer historyId;
    private String className;
    private Integer mileageAmount;
    private LocalDateTime time;
    private Integer state;
    private Integer finalAmount;
}
