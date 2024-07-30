package com.ssafy.ditto.domain.liveroom.service;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.repository.LearningRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.liveroom.domain.LiveRoom;
import com.ssafy.ditto.domain.liveroom.repository.LiveRoomRepository;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
@RequiredArgsConstructor
public class LiveRoomServiceImpl implements LiveRoomService {
    private final LiveRoomRepository liveRoomRepository;
    private final UserRepository userRepository;
    private final LearningRepository learningRepository;
    private final LectureRepository lectureRepository;

    // 라이브 생성
    @Override
    public void createLiveRoom(String liveSessionName, int lectureId) {
        LiveRoom liveRoom = new LiveRoom();
        Lecture lecture = lectureRepository.findByLectureId(lectureId);
        liveRoom.setLiveRoomState("진행 전");
        int learnCount = learningRepository.countByLectureId(lectureId);
        liveRoom.setMaxCount((byte)learnCount);
        liveRoom.setCurrentCount((byte)0);
        liveRoom.setName(liveSessionName);
        liveRoomRepository.save(liveRoom);
    }

    // 라이브 참여
    @Override
    public Integer enterLiveRoom(int lectureId) throws Exception {
//        LiveRoom liveRoom = LiveRoomRepository.getLiveRoomByLectureId(lectureId);
        LiveRoom liveRoom = new LiveRoom();
        int currentCount = liveRoom.getCurrentCount();
        int maxCount = liveRoom.getMaxCount();
        if(currentCount >= maxCount) {
            return null;
        }

        int updateCount = liveRoom.getCurrentCount()+1;
        liveRoom.setCurrentCount((byte)updateCount);
        liveRoomRepository.save(liveRoom);
        return updateCount;
    }

    // 라이브 떠나기
    @Override
    public void leaveLiveRoom(int lectureId) throws Exception {

    }

    // 현재 인원 - 수강신청한 인원보다 적은지 확인용
    @Override
    public int getUserCount(int lectureId) throws Exception {
        return 0;
    }
}
