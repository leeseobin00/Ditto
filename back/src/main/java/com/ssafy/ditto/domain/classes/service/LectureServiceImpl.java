package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.dto.LectureRequest;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
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

    @Override
    @Transactional
    public void createLecture(Integer classId, LectureRequest lectureRequest) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
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

}
