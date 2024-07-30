package com.ssafy.ditto.domain.user.auth;

import com.ssafy.ditto.domain.user.dto.KakaoTokenResponse;
import com.ssafy.ditto.domain.user.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Component
@RequiredArgsConstructor
public class KakaoTokenJsonData {
    private final WebClient webClient = WebClient.builder().build();
    @Value("${kakao.token-uri}")
    private String tokenUri;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    @Value("${kakao.grant-type}")
    private String grantType;

    @Value("${kakao.client-id}")
    private String clientId;

    public KakaoTokenResponse getToken(String code) {
        String uri = tokenUri + "?grant_type=" + grantType + "&client_id=" + clientId + "&redirect_uri=" + redirectUri + "&code=" + code;
        System.out.println(uri);

        Flux<KakaoTokenResponse> response = webClient.post()
                .uri(uri)
                .contentType(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToFlux(KakaoTokenResponse.class);

        return response.blockFirst();
    }
}