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

    public String summarize(List<String> originText) {
        return originText.get(0).substring(0, originText.get(0).length()/2);
//        return openAIService.summarize(originText);
    }
}
