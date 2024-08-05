package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PaymentResponse {
    private Integer paymentId;
    private LocalDateTime payTime;
    private LocalDateTime payCancelTime;
    private Integer fileId;
    private String fileUrl;
    private Integer lectureId;
    private Integer classId;
    private String className;
    private Integer classPrice;
    private Integer year;
    private Byte month;
    private Byte day;
    private Byte hour;
    private Byte minute;
}
