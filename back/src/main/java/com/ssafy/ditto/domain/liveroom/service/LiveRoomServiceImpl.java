package com.ssafy.ditto.domain.liveroom.service;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.exception.LectureNotFoundException;
import com.ssafy.ditto.domain.liveroom.repository.LearningRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.liveroom.domain.LiveRoom;
import com.ssafy.ditto.domain.liveroom.repository.LiveRoomRepository;
import com.ssafy.ditto.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
@Service
@RequiredArgsConstructor
public class LiveRoomServiceImpl implements LiveRoomService {
    private final LiveRoomRepository liveRoomRepository;
    private final LearningRepository learningRepository;
    private final LectureRepository lectureRepository;

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
    public void endLiveRoom(int lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        Optional<LiveRoom> liveRoomOptional = liveRoomRepository.findByLecture(lecture);
        if (liveRoomOptional.isPresent()) {
            LiveRoom liveRoom = liveRoomOptional.get();
            liveRoom.setIsFinished(true);
            liveRoomRepository.save(liveRoom);
        }
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
}
