package com.ssafy.ditto.domain.mypage.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PaymentResponse {
    private int paymentId;
    private LocalDateTime payTime;
    private LocalDateTime payCancelTime;
    private int fileId;
    private String fileUrl;
    private int classId;
    private String className;
    private int classPrice;
    private int lectureId;
    private Byte year;
    private Byte month;
    private Byte day;
    private Byte hour;
    private Byte minute;
}
