package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.dto.LectureRequest;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.exception.LectureNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LectureServiceImpl implements LectureService {
    private final LectureRepository lectureRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void createLecture(Integer classId, LectureRequest lectureRequest) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        User user = userRepository.findById(dClass.getUserId().getUserId()).orElseThrow(UserNotFoundException::new);

        Lecture lecture = Lecture.builder()
                .year(lectureRequest.getYear())
                .month(lectureRequest.getMonth())
                .day(lectureRequest.getDay())
                .hour(lectureRequest.getHour())
                .minute(lectureRequest.getMinute())
                .classId(dClass)
                .className(dClass.getClassName())
                .userCount((byte) 0)
                .classPrice(dClass.getClassPrice())
                .isDeleted(false)
                .build();
        lectureRepository.save(lecture);
    }

    @Override
    @Transactional
    public void updateLecture(Integer classId, Integer lectureId, LectureRequest lectureRequest) {
        classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);

        lecture.setYear(lectureRequest.getYear());
        lecture.setMonth(lectureRequest.getMonth());
        lecture.setDay(lectureRequest.getDay());
        lecture.setHour(lectureRequest.getHour());
        lecture.setMinute(lectureRequest.getMinute());

        lectureRepository.save(lecture);
    }

    @Override
    public void deleteLecture(Integer classId, Integer lectureId) {
        classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(LectureNotFoundException::new);
        lecture.setIsDeleted(true);
        lectureRepository.save(lecture);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LectureResponse> getLecturesByClassId(Integer classId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        List<Lecture> lectures = lectureRepository.findAllByClassIdAndIsDeletedFalse(dClass);
        return lectures.stream()
                .map(lecture -> LectureResponse.builder()
                        .lectureId(lecture.getLectureId())
                        .year(lecture.getYear())
                        .month(lecture.getMonth())
                        .day(lecture.getDay())
                        .hour(lecture.getHour())
                        .minute(lecture.getMinute())
                        .userCount(lecture.getUserCount())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<LectureResponse> getLecturesWithoutReviews(Integer classId, Integer userId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        User user = userRepository.findById(dClass.getUserId().getUserId()).orElseThrow(UserNotFoundException::new);

        List<Lecture> lectures = lectureRepository.findLecturesWithoutReviews(classId, userId);
        return lectures.stream()
                .map(lecture -> LectureResponse.builder()
                        .lectureId(lecture.getLectureId())
                        .year(lecture.getYear())
                        .month(lecture.getMonth())
                        .day(lecture.getDay())
                        .hour(lecture.getHour())
                        .minute(lecture.getMinute())
                        .userCount(lecture.getUserCount())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<LectureResponse> getCompletedLecturesWithoutReviews(Integer classId, Integer userId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        User user = userRepository.findById(dClass.getUserId().getUserId()).orElseThrow(UserNotFoundException::new);

        List<Lecture> lectures = lectureRepository.findCompletedLearningsByClassAndUser(classId, userId);
        return lectures.stream()
                .map(lecture -> LectureResponse.builder()
                        .lectureId(lecture.getLectureId())
                        .year(lecture.getYear())
                        .month(lecture.getMonth())
                        .day(lecture.getDay())
                        .hour(lecture.getHour())
                        .minute(lecture.getMinute())
                        .userCount(lecture.getUserCount())
                        .build())
                .collect(Collectors.toList());
    }
}
