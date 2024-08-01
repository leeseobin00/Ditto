package com.ssafy.ditto.domain.liveroom.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ConnectionResponse {
    private String token;
    private String role;
    private String connectionId;
}