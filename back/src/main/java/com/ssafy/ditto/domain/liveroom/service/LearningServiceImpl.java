package com.ssafy.ditto.domain.liveroom.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.liveroom.domain.Learning;
import com.ssafy.ditto.domain.liveroom.dto.LearningPageResponse;
import com.ssafy.ditto.domain.liveroom.dto.LearningResponse;
import com.ssafy.ditto.domain.liveroom.repository.LearningRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import com.ssafy.ditto.global.error.ServiceException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.ditto.global.error.ErrorCode.*;

@Component
@Service
@RequiredArgsConstructor
public class LearningServiceImpl implements LearningService {
    private final UserRepository userRepository;
    private final ClassRepository classRepository;
    private final LectureRepository lectureRepository;
    private final LearningRepository learningRepository;

    @Override
    @Transactional
    public boolean isValidUser(Integer userId, Integer lectureId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new ServiceException(LECTURE_NOT_FOUND));
        // 사용자와 강의로 등록 여부 확인
        return learningRepository.existsByStudentAndLecture(user, lecture);
    }

    @Override
    public void changeStatus(Integer lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new ServiceException(LECTURE_NOT_FOUND));
        // lecture 듣는 모든 수강생들의 상태 변경
        List<Learning> learnings = learningRepository.findAllByLecture(lecture);
        for (Learning learning : learnings) {
            learning.setIsFinished(true);
            learningRepository.save(learning);
        }
    }

    @Override
    @Transactional
    public LearningPageResponse getStudentLearning(Integer userId, Pageable pageable) {
        User student = userRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));

        Page<Learning> learningPage = learningRepository.findByStudent(student,pageable);

        return LearningPageResponse.of(
                learningPage.stream().map(learning -> {
                    DClass dClass = classRepository.findById(learning.getDClass().getClassId())
                            .orElseThrow(() -> new ServiceException(CLASS_NOT_FOUND));
                    Lecture lecture = lectureRepository.findById(learning.getLecture().getLectureId())
                            .orElseThrow(() -> new ServiceException(LECTURE_NOT_FOUND));
                    return LearningResponse.of(dClass,lecture,learning.getIsFinished());
                }).collect(Collectors.toList()),
                learningPage.getNumber()+1,
                learningPage.getTotalPages()
        );
    }

    @Override
    @Transactional
    public LearningPageResponse getTeacherLearning(Integer userId, Pageable pageable) {
        User teacher = userRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));

        Page<Learning> learningPage = learningRepository.findByTeacher(teacher,pageable);

        return LearningPageResponse.of(
                learningPage.stream().map(learning -> {
                    DClass dClass = classRepository.findById(learning.getDClass().getClassId())
                            .orElseThrow(() -> new ServiceException(CLASS_NOT_FOUND));
                    Lecture lecture = lectureRepository.findById(learning.getLecture().getLectureId())
                            .orElseThrow(() -> new ServiceException(LECTURE_NOT_FOUND));
                    return LearningResponse.of(dClass,lecture,learning.getIsFinished());
                }).collect(Collectors.toList()),
                learningPage.getNumber()+1,
                learningPage.getTotalPages()
        );
    }

    @Override
    @Transactional
    public void addStudent(Integer userId, Integer lectureId) {
        User student = userRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        Lecture lecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new ServiceException(LECTURE_NOT_FOUND));
        DClass dClass = lecture.getClassId();
        User teacher = dClass.getUserId();

        Learning learning = Learning.builder()
                .dClass(dClass)
                .lecture(lecture)
                .student(student)
                .teacher(teacher)
                .isFinished(false)
                .build();

        learningRepository.save(learning);
    }

    @Override
    public void deleteStudent(Integer userId, Integer lectureId) {
        User student = userRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        Lecture lecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new ServiceException(LECTURE_NOT_FOUND));

        Optional<Learning> learningOptional = learningRepository.findByStudentAndLecture(student,lecture);
        if(learningOptional.isPresent()) {
            Learning learning = learningOptional.get();
            learningRepository.delete(learning);
        }
    }
}
