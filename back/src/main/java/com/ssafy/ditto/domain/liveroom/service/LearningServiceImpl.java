package com.ssafy.ditto.domain.liveroom.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.liveroom.domain.Learning;
import com.ssafy.ditto.domain.liveroom.dto.LearningPageResponse;
import com.ssafy.ditto.domain.liveroom.dto.LearningResponse;
import com.ssafy.ditto.domain.liveroom.repository.LearningRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import com.ssafy.ditto.global.error.ServiceException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
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
    @Transactional
    public void changeStatus(Integer lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new ServiceException(LECTURE_NOT_FOUND));

        // Lecture의 isFinished 필드를 true로 설정
        lecture.setIsFinished(true);
        lectureRepository.save(lecture);
    }

    @Override
    @Transactional
    public LearningPageResponse getStudentLearning(Integer userId, Pageable pageable) {
        User student = userRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));

        Page<Learning> learningPage = learningRepository.findByStudent(student, pageable);

        return LearningPageResponse.of(
                learningPage.stream().map(learning ->
                        LearningResponse.of(
                                learning.getDClass(),
                                learning.getLecture(),
                                learning.getLecture().getIsFinished()
                        )
                ).collect(Collectors.toList()),
                learningPage.getNumber() + 1,
                learningPage.getTotalPages()
        );
    }

    @Override
    @Transactional
    public LearningPageResponse getTeacherLearning(Integer userId, Pageable pageable) {
        User teacher = userRepository.findById(userId)
                .orElseThrow(() -> new ServiceException(USER_NOT_FOUND));

        // 모든 학습 데이터를 가져옴
        List<Learning> allLearnings = learningRepository.findByTeacher(teacher);

        // lectureId 기준으로 중복 제거
        Map<Integer, Learning> distinctLearningsMap = new LinkedHashMap<>();
        for (Learning learning : allLearnings) {
            distinctLearningsMap.putIfAbsent(learning.getLecture().getLectureId(), learning);
        }
        List<Learning> distinctLearnings = new ArrayList<>(distinctLearningsMap.values());

        // 페이징 처리
        int start = Math.min((int) pageable.getOffset(), distinctLearnings.size());
        int end = Math.min((start + pageable.getPageSize()), distinctLearnings.size());
        List<Learning> paginatedLearnings = distinctLearnings.subList(start, end);

        // Response 변환
        List<LearningResponse> learningResponses = paginatedLearnings.stream()
                .map(learning -> LearningResponse.of(learning.getDClass(), learning.getLecture(), learning.getLecture().getIsFinished()))
                .collect(Collectors.toList());

        return LearningPageResponse.of(
                learningResponses,
                pageable.getPageNumber() + 1,
                (int) Math.ceil((double) distinctLearnings.size() / pageable.getPageSize())
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
                .build();

        learningRepository.save(learning);
    }

    @Override
    public void deleteStudent(Integer userId, Integer lectureId) {
        User student = userRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        Lecture lecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new ServiceException(LECTURE_NOT_FOUND));

        Optional<Learning> learningOptional = learningRepository.findByStudentAndLecture(student, lecture);
        if (learningOptional.isPresent()) {
            Learning learning = learningOptional.get();
            learningRepository.delete(learning);
        }
    }

    @Override
    @Transactional
    public List<Integer> getStudentList(Integer lectureId) {
        List<Integer> list = learningRepository.findStudentUserIdsByLectureId(lectureId);
        System.out.println(list.toString());
        return list;
    }
}
