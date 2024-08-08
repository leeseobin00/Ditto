package com.ssafy.ditto.global.tasklet;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.service.LectureService;
import com.ssafy.ditto.domain.liveroom.service.LearningService;
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
    private final LearningService learningService;

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();

        List<Lecture> lectures = lectureService.getLecturesForDate(today);

        for (Lecture lecture : lectures) {
            LocalDateTime lectureStartTime = lecture.getStartDateTime();
            LocalDateTime createTime = lectureStartTime.minusMinutes(30);

            // 끝나는 시간 클래스 진행시간 + 1시간 후에 자동으로 라이브 룸 삭제
            DClass dClass = lecture.getClassId();
            LocalDateTime endTime = lectureStartTime.plusHours(dClass.getClassHour()+1)
                                                    .plusMinutes(dClass.getClassMinute());

            if (now.isAfter(createTime) && now.isBefore(lectureStartTime)) {
                liveRoomService.createLiveRoom(lecture.getLectureId());

//                sessionService.createSession(lecture.getLectureId(), lecture.getClassId().getUserId().getUserId());
//                List<Integer> studentList = learningService.getStudentList(lecture.getLectureId());
//                for(Integer studentId : studentList) {
//                    sessionService.getToken(lecture.getLectureId(), studentId);
//                }
            }

            if (now.isAfter(endTime)) {
//                liveRoomService.endLiveRoom(lecture.getLectureId());
                /*
                lecture도 is finished 설정해야함 그리고 한번만 endliveroom
                if lecture is finished지만 정산 못 받았다
                마일리지 추가 후 마일리지 히스토리에 등록하는 메서드 필요
                 */
            }
        }

        return RepeatStatus.FINISHED;
    }
}
