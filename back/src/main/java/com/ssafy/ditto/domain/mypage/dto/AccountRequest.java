package com.ssafy.ditto.domain.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "계좌 요청", description = "계좌 정보 요청 DTO")
public class AccountRequest {
    @Schema(description = "계좌 번호", example = "123-456-789")
    private String accountNumber;

    @Schema(description = "은행명", example = "국민은행")
    private String bank;

    @Schema(description = "수신자", example = "홍길동")
    private String receiver;
}
