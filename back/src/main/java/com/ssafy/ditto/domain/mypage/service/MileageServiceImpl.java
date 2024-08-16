package com.ssafy.ditto.domain.mypage.service;

import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.exception.LectureNotFoundException;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.mypage.domain.Mileage;
import com.ssafy.ditto.domain.mypage.domain.MileageHistory;
import com.ssafy.ditto.domain.mypage.repository.MileageHistoryRepository;
import com.ssafy.ditto.domain.mypage.repository.MileageRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MileageServiceImpl implements MileageService {
    private final MileageRepository mileageRepository;
    private final MileageHistoryRepository mileageHistoryRepository;
    private final LectureRepository lectureRepository;

    @Override
    public void addMileage(int lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        User user = lecture.getClassId().getUserId();
        int amount = lecture.getClassPrice()*lecture.getUserCount();

        Optional<MileageHistory> mileageHistory = mileageHistoryRepository.findByUserAndLecture(user,lecture);

        if(mileageHistory.isPresent() || amount==0){
            return;
        }

        Mileage current = mileageRepository.findByUser(user);
        current.changeMileage(current.getMileage()+amount);
        mileageRepository.save(current);

        MileageHistory newHistory = MileageHistory.builder()
                .lecture(lecture)
                .user(user)
                .mileage(current)
                .state(0)
                .time(LocalDateTime.now())
                .mileageAmount(amount)
                .finalAmount(current.getMileage())
                .build();
        mileageHistoryRepository.save(newHistory);
    }
}
