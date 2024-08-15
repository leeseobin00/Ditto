package com.ssafy.ditto.domain.liveroom.dto;

import io.openvidu.java.client.OpenViduRole;
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
    private String connectionId;
    private OpenViduRole role;
}