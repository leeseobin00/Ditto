package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SummaryResponse {
    private Integer summaryId;
    private Integer stepId;
    private String summaryContent;
}
