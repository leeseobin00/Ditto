package com.ssafy.ditto.domain.liveroom.service;

import com.ssafy.ditto.domain.classes.repository.LectureRepository;
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
    private final LectureRepository lectureRepository;

    // 라이브 생성
    @Override
    public void createLiveRoom(String LiveSessionName, int lectureId) {

    }

    // 라이브 참여
    @Override
    public Integer enterLiveRoom(int lectureId) throws Exception {
        return 0;
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
