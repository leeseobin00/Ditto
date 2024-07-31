package com.ssafy.ditto.domain.liveroom.service;

import com.ssafy.ditto.domain.classes.domain.Lecture;
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
        LiveRoom liveRoom = new LiveRoom();
        Lecture lecture = lectureRepository.findByLectureId(lectureId);
        User user = lecture.getClassId().getUserId();

        liveRoom.setIsFinished(false);
        int learnCount = learningRepository.countByLectureId(lectureId);
        liveRoom.setMaxCount((byte)learnCount);
        liveRoom.setCurrentCount((byte)0);
        String liveSessionName = user.getNickname()+"의 "+lecture.getClassName()+" 라이브 방";
        liveRoom.setName(liveSessionName);
        liveRoom.setOpenTime(LocalDateTime.now());
        liveRoomRepository.save(liveRoom);
    }

    @Override
    public String getSessionName(int lectureId) throws Exception{
        LiveRoom liveRoom = liveRoomRepository.findByLecture_LectureId(lectureId);
        return liveRoom.getName();
    }

    // 라이브 참여
    @Override
    public Integer enterLiveRoom(int lectureId) throws Exception{
        LiveRoom liveRoom = liveRoomRepository.findByLecture_LectureId(lectureId);
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

    // 라이브 모두 떠나기
    @Override
    public void leaveLiveRoom(int lectureId) throws Exception {
        LiveRoom liveRoom = liveRoomRepository.findByLecture_LectureId(lectureId);
        liveRoom.setCurrentCount((byte)0);
        liveRoom.setIsFinished(true);
        liveRoomRepository.save(liveRoom);
    }

    // 현재 인원 확인용
    @Override
    public int getUserCount(int lectureId) throws Exception {
        LiveRoom liveRoom = liveRoomRepository.findByLecture_LectureId(lectureId);
        return liveRoom.getCurrentCount();
    }
}
