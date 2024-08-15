package com.ssafy.ditto.domain.mypage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@Schema(title = "주소 응답", description = "주소 응답 DTO")
public class AddressResponse {
    @Schema(description = "주소 목록")
    private List<AddressListResponse> addresses;
}
