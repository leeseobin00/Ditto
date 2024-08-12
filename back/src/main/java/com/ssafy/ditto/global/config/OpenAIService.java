package com.ssafy.ditto.global.config;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenAIService {
    private static final Logger logger = LoggerFactory.getLogger(OpenAIService.class);
    private final WebClient openAiWebClient;

    @Value("${openai.model}")
    private String model;

    public Mono<String> summarize(String originText) {
        logger.info("origin text: {}", originText);
        Map<String, Object> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "당신은 한국 표준어 요약 전문가입니다. 제시된 문장을 전처리한 후 200자 내외로 요약한 요약본을 제시하세요.");

        Map<String, Object> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", "'" + originText + "'를 200자 내외로 요약해줘. 200자가 넘지 않으면 요약하지 않고 다듬기만 해줘. 요구한 결과물만 출력해줘");

        List<Map<String, Object>> messages = List.of(systemMessage, userMessage);

        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", messages);
        body.put("max_tokens", 1000);

        return openAiWebClient.post()
                .uri("/chat/completions")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    logger.info("Received response: {}", response);
                    List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                })
                .doOnError(e -> logger.error("Error during transcribe and translate request", e));
    }
}
