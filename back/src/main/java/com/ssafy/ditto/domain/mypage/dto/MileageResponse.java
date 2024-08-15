package com.ssafy.ditto.domain.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "마일리지 응답", description = "마일리지 응답 DTO")
public class MileageResponse {
    @Schema(description = "마일리지 금액", example = "1000")
    private Integer mileage;

    @Schema(description = "계좌 번호", example = "123-456-789")
    private String accountNumber;

    @Schema(description = "은행명", example = "국민은행")
    private String bank;

    @Schema(description = "수신자", example = "홍길동")
    private String receiver;
}
