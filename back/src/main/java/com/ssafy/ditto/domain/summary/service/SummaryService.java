package com.ssafy.ditto.domain.summary.service;

import com.ssafy.ditto.domain.summary.dto.SummaryResponse;

import java.util.List;

public interface SummaryService {
    void addText(int lectureId, int stepId, String text);

    List<SummaryResponse> getSummary(int lectureId);
}
