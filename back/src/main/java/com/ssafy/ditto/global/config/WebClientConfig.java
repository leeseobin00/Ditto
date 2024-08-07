package com.ssafy.ditto.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${openai.api-key}")
    private String API_KEY;

    @Value("${ai.base.url}")
    public String AI_BASE_URL;

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                        .baseUrl(AI_BASE_URL)
                        .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + API_KEY)
                        .build();
    }
}