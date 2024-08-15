package com.ssafy.ditto.domain.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(title = "주소 요청", description = "주소 요청 DTO")
public class AddressRequest {
    @Schema(description = "주소명", example = "자택")
    private String addressName;

    @Schema(description = "우편번호", example = "12345")
    private String zipCode;

    @Schema(description = "주소 1", example = "서울시 강남구")
    private String address1;

    @Schema(description = "주소 2", example = "123-45")
    private String address2;

    @Schema(description = "수신자", example = "홍길동")
    private String receiver;

    @Schema(description = "전화번호", example = "010-1234-5678")
    private String phoneNumber;

    @Schema(description = "기본 주소 여부", example = "true")
    private Boolean isDefault;
}
