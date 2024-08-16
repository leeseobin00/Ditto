package com.ssafy.ditto.domain.summary.service;

import com.ssafy.ditto.global.config.OpenAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatGptService {
    private final OpenAIService openAIService;

    public Mono<String> summarize(String originText) {
//        return originText.substring(0, originText.length()/2);
        return openAIService.summarize(originText);
    }
}
