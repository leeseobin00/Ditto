package com.ssafy.ditto.domain.liveroom.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionCreationResponse {
    private int statusCode;
    private String message;
    private String sessionId;
}