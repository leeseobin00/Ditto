package com.ssafy.ditto.domain.user.auth;

import com.ssafy.ditto.domain.user.dto.KakaoUserInfoResponse;
import com.ssafy.ditto.domain.user.dto.KakaoUserLoginRequest;
import com.ssafy.ditto.domain.user.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@RequiredArgsConstructor
@Component
public class KakaoUserInfo {
    private final WebClient webClient = WebClient.builder().build();

    @Value("${kakao.user-info-uri}")
    private String userInfoUri;

    // 카카오에서 사용자 정보(이메일, 닉네임)를 불러옴
    public KakaoUserLoginRequest getUserInfo(String token) {

        Flux<KakaoUserInfoResponse> response = webClient.get()
                .uri(userInfoUri)
                .header("Authorization", "Bearer " + token)
                .retrieve()
                .bodyToFlux(KakaoUserInfoResponse.class);

        KakaoUserInfoResponse kakaoUserInfoResponse = response.blockFirst();

        if (kakaoUserInfoResponse == null) {
            throw new IllegalStateException("Failed to retrieve user info from Kakao");
        }

        return KakaoUserLoginRequest.builder()
                .email(kakaoUserInfoResponse.getKakaoAccount().getEmail())
                .nickname(kakaoUserInfoResponse.getKakaoAccount().getProfile().getNickname())
                .build();
    }
}