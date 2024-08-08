package com.ssafy.ditto.global.tasklet;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.liveroom.service.LiveRoomService;
import com.ssafy.ditto.domain.liveroom.service.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ManageLiveRoomsTasklet implements Tasklet {

    private final LectureService lectureService;
    private final LiveRoomService liveRoomService;
    private final SessionService sessionService;

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();

        List<Lecture> lectures = lectureService.getLecturesForDate(today);

        for (Lecture lecture : lectures) {
            LocalDateTime lectureStartTime = lecture.getStartDateTime();
            LocalDateTime createTime = lectureStartTime.minusMinutes(30);
            LocalDateTime endTime = lectureStartTime.plusHours(3);

            if (now.isAfter(createTime) && now.isBefore(lectureStartTime)) {
                liveRoomService.createLiveRoom(lecture.getLectureId());
//                sessionService.createSession(lecture.getLectureId(), lecture.getClassId().getUserId().getUserId());
//                토큰 관련 로직 추가필요
            }

            if (now.isAfter(endTime)) {
                liveRoomService.endLiveRoom(lecture.getLectureId());
            }
        }

        return RepeatStatus.FINISHED;
    }
}
