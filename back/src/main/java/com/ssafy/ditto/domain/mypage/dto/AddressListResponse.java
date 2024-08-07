package com.ssafy.ditto.domain.mypage.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressListResponse {
        private Integer addressId;
        private String zipCode;
        private String address1;
        private String address2;
        private String addressName;
        private String receiver;
        private String phoneNumber;
        private Boolean isDefault;
}
