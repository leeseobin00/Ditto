package com.ssafy.ditto.domain.summary.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.domain.Step;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.exception.LectureNotFoundException;
import com.ssafy.ditto.domain.classes.exception.StepNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.classes.repository.StepRepository;
import com.ssafy.ditto.domain.summary.domain.Summary;
import com.ssafy.ditto.domain.summary.repository.SummaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Component
@Service
@RequiredArgsConstructor
public class SummaryServiceImpl implements SummaryService {
    private final LectureRepository lectureRepository;
    private final StepRepository stepRepository;
    private final SummaryRepository summaryRepository;

    @Override
    @Transactional
    public void addText(int lectureId, int stepId, String text) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        Step step = stepRepository.findById(stepId).orElseThrow(StepNotFoundException::new);
        Summary summary = Summary.builder()
                .summaryContent(text)
                .lecture(lecture)
                .step(step)
                .build();

        summaryRepository.save(summary);
    }
}
