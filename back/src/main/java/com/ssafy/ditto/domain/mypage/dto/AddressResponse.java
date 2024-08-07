package com.ssafy.ditto.domain.mypage.dto;

import com.ssafy.ditto.domain.mypage.domain.Address;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AddressResponse {
    private List<AddressListResponse> addresses;
}
