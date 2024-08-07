package com.ssafy.ditto.global.config;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.liveroom.controller.SessionController;
import com.ssafy.ditto.domain.liveroom.service.LiveRoomService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableBatchProcessing
public class BatchConfig {
    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final LectureService lectureService;
    private final LiveRoomService liveRoomService;
//    private final SessionController sessionController;


    @Bean
    public Job job() {
        return new JobBuilder("manageLiveRooms", jobRepository)
                .start(step())
                .build();
    }

    @Bean
    public Step step() {
        return new StepBuilder("step", jobRepository)
                .tasklet((contribution, chunkContext) -> {
                    LocalDateTime now = LocalDateTime.now();
                    LocalDate today = now.toLocalDate();

                    // 현재 날짜를 기준으로 강의 목록 조회
                    List<Lecture> lectures = lectureService.getLecturesForDate(today);

                    for (Lecture lecture : lectures) {
                        LocalDateTime lectureStartTime = lecture.getStartDateTime();
                        LocalDateTime createTime = lectureStartTime.minusHours(1);
                        LocalDateTime endTime = lectureStartTime.plusHours(3);

                        if (now.isAfter(createTime) && now.isBefore(lectureStartTime)) {
                            liveRoomService.createLiveRoom(lecture.getLectureId());
//                            sessionController.createLiveRoom(lecture.getLectureId(), lecture.getClassId().getUserId().getUserId());
                        }

                        if (now.isAfter(endTime)) {
                            liveRoomService.endLiveRoom(lecture.getLectureId());
                        }
                    }

                    return RepeatStatus.FINISHED;
                }, transactionManager)
                .build();
    }
}