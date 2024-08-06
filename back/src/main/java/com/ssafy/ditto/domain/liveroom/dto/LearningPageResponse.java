package com.ssafy.ditto.domain.liveroom.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningPageResponse {
    private List<LearningResponse> learnings;
    private int currentPage;
    private int totalPageCount;

    public static LearningPageResponse of(List<LearningResponse> learnings, int currentPage, int totalPageCount){
        return LearningPageResponse.builder()
                .learnings(learnings)
                .currentPage(currentPage)
                .totalPageCount(totalPageCount)
                .build();
    }
}
