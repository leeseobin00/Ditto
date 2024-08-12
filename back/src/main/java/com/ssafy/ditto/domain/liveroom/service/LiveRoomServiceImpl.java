package com.ssafy.ditto.domain.liveroom.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.domain.Step;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;
import com.ssafy.ditto.domain.classes.dto.StepDetailResponse;
import com.ssafy.ditto.domain.classes.exception.LectureNotFoundException;
import com.ssafy.ditto.domain.classes.repository.StepRepository;
import com.ssafy.ditto.domain.file.dto.FileResponse;
import com.ssafy.ditto.domain.liveroom.dto.LiveRoomInfoResponse;
import com.ssafy.ditto.domain.liveroom.repository.LearningRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.liveroom.domain.LiveRoom;
import com.ssafy.ditto.domain.liveroom.repository.LiveRoomRepository;
import com.ssafy.ditto.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Service
@RequiredArgsConstructor
public class LiveRoomServiceImpl implements LiveRoomService {
    private final LiveRoomRepository liveRoomRepository;
    private final LearningRepository learningRepository;
    private final LectureRepository lectureRepository;
    private final StepRepository stepRepository;

    // 라이브 생성
    @Override
    @Transactional
    public void createLiveRoom(int lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        Optional<LiveRoom> liveRoomOptional = liveRoomRepository.findByLecture(lecture);
        if(liveRoomOptional.isPresent()) return ;

        LiveRoom liveRoom = new LiveRoom();
        User user = lecture.getClassId().getUserId();
        liveRoom.setLecture(lecture);
        liveRoom.setIsFinished(false);
        int learnCount = learningRepository.countByLectureId(lectureId);
        liveRoom.setMaxCount((byte)learnCount);
        liveRoom.setCurrentCount((byte)0);
        String liveSessionName = user.getNickname()+"의 "+lecture.getClassName()+" "
                +lecture.getMonth()+"월 "+lecture.getDay()+"일"+" 라이브 방";
        liveRoom.setName(liveSessionName);
        liveRoom.setOpenTime(LocalDateTime.now());
        liveRoomRepository.save(liveRoom);
    }

    @Override
    public boolean endLiveRoom(int lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        Optional<LiveRoom> liveRoomOptional = liveRoomRepository.findByLecture(lecture);
        if (liveRoomOptional.isPresent()) {
            LiveRoom liveRoom = liveRoomOptional.get();
            if(liveRoom.getIsFinished()) {
                return false;
            }
            liveRoom.setIsFinished(true);
            liveRoomRepository.save(liveRoom);
            return true;
        }
        return false;
    }

    @Override
    public void setSession(int lectureId, String sessionId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        Optional<LiveRoom> liveRoomOptional = liveRoomRepository.findByLecture(lecture);
        if (liveRoomOptional.isPresent()) {
            LiveRoom liveRoom = liveRoomOptional.get();
            liveRoom.setSessionId(sessionId);
            liveRoomRepository.save(liveRoom);
        }
    }

    @Override
    public String getSession(int lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        Optional<LiveRoom> liveRoomOptional = liveRoomRepository.findByLecture(lecture);
        if (liveRoomOptional.isPresent()) {
            LiveRoom liveRoom = liveRoomOptional.get();
            return liveRoom.getSessionId();
        }
        return null;
    }

    // 라이브 참여
    @Override
    public Integer enterLiveRoom(int lectureId) throws Exception {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        Optional<LiveRoom> liveRoomOptional = liveRoomRepository.findByLecture(lecture);
        if (liveRoomOptional.isPresent()) {
            LiveRoom liveRoom = liveRoomOptional.get();
            int currentCount = liveRoom.getCurrentCount();
            int maxCount = liveRoom.getMaxCount();
            if(currentCount >= maxCount) {
                return null;
            }

            // 참여 중인 인원 업데이트
            int updateCount = liveRoom.getCurrentCount()+1;
            liveRoom.setCurrentCount((byte)updateCount);
            liveRoomRepository.save(liveRoom);
            return updateCount;
        }
        return null;
    }

    // 라이브 모두 떠나기
    @Override
    public void leaveLiveRoom(int lectureId) throws Exception {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        Optional<LiveRoom> liveRoomOptional = liveRoomRepository.findByLecture(lecture);
        if (liveRoomOptional.isEmpty()) {
            LiveRoom liveRoom = liveRoomOptional.get();
            liveRoom.setCurrentCount((byte) 0);
            liveRoom.setIsFinished(true);
            liveRoomRepository.save(liveRoom);
        }
    }

    // 현재 인원 확인용
    @Override
    public Integer getUserCount(int lectureId) throws Exception {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        Optional<LiveRoom> liveRoomOptional = liveRoomRepository.findByLecture(lecture);
        if (liveRoomOptional.isPresent()) {
            LiveRoom liveRoom = liveRoomOptional.get();
            return (int)liveRoom.getCurrentCount();
        }
        return null;
    }

    @Override
    @Transactional
    public LiveRoomInfoResponse getLiveRoomInfo(int lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        DClass dClass = lecture.getClassId();
        List<Step> steps = stepRepository.findAllByClassId(dClass);
        List<StepDetailResponse> stepDetailResponses = steps.stream().map(step -> StepDetailResponse.of(step, step.getFileId() != null ? FileResponse.of(step.getFileId()) : null)).collect(Collectors.toList());

        return LiveRoomInfoResponse.builder()
                .className(dClass.getClassName())
                .lectureResponse(LectureResponse.of(lecture))
                .stepList(stepDetailResponses)
                .build();
    }
}
