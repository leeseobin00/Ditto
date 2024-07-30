package com.ssafy.ditto.domain.liveroom.service;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.liveroom.repository.LearningRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import com.ssafy.ditto.global.error.ServiceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import static com.ssafy.ditto.global.error.ErrorCode.LECTURE_NOT_FOUND;
import static com.ssafy.ditto.global.error.ErrorCode.USER_NOT_FOUND;

@Component
@Service
@RequiredArgsConstructor
public class LearningServiceImpl implements LearningService {
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;
    private final LearningRepository learningRepository;

    @Override
    public boolean isValidUser(Integer userId, Integer lectureId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new ServiceException(LECTURE_NOT_FOUND));
        // 사용자와 강의로 등록 여부 확인
        boolean isRegistered = learningRepository.existsByStudentIdAndLectureId(user, lecture);
        return isRegistered;
    }
}
