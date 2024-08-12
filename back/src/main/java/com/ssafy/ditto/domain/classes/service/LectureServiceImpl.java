package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.dto.LectureRequest;
import com.ssafy.ditto.domain.classes.dto.LectureResponse;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.exception.LectureDuplicateException;
import com.ssafy.ditto.domain.classes.exception.LectureNotFoundException;
import com.ssafy.ditto.domain.classes.exception.LectureNotFutureException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import com.ssafy.ditto.global.error.ServiceException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.ditto.global.error.ErrorCode.USER_NOT_FOUND;

@Component
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

        // 요청된 시간을 LocalDateTime 객체로 생성
        LocalDateTime lectureDateTime = LocalDateTime.of(
                lectureRequest.getYear(),
                lectureRequest.getMonth(),
                lectureRequest.getDay(),
                lectureRequest.getHour(),
                lectureRequest.getMinute()
        );

        // 현재 시간보다 과거 시간이면 에러 발생
        if (lectureDateTime.isBefore(LocalDateTime.now())) {
            throw new LectureNotFutureException();
        }

        //이미 존재하는 차시일 경우 에러
        Lecture lecture = lectureRepository.findByClassIdAndYearAndMonthAndDayAndHourAndMinute(dClass, lectureRequest.getYear(), lectureRequest.getMonth(), lectureRequest.getDay(), lectureRequest.getHour(), lectureRequest.getMinute());
        if (lecture != null){
            throw new LectureDuplicateException();
        }

        Lecture newLecture = Lecture.builder()
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
                .isFinished(false)
                .build();
        lectureRepository.save(newLecture);
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
    public List<LectureResponse> getUpcomingLecturesByClassId(Integer classId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        LocalDateTime now = LocalDateTime.now();

        List<Lecture> lectures = lectureRepository.findUpcomingLecturesByDclass(
                classId,
                now.getYear(),
                (byte) now.getMonthValue(),
                (byte) now.getDayOfMonth(),
                (byte) now.getHour(),
                (byte) now.getMinute()
        );
        return lectures.stream()
                .map(LectureResponse::of)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<LectureResponse> getLecturesWithoutReviews(Integer classId, Integer userId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        User user = userRepository.findById(dClass.getUserId().getUserId()).orElseThrow(UserNotFoundException::new);

        List<Lecture> lectures = lectureRepository.findLecturesWithoutReviews(classId, userId);
        return lectures.stream()
                .map(LectureResponse::of)
                .collect(Collectors.toList());
    }

    @Override
    public Boolean checkReviewCompleted(Integer classId, Integer lectureId, Integer userId) {
        Boolean exists = lectureRepository.existsReviewByLectureIdAndUserId(lectureId, userId);
        System.out.println("Check Payment Completed - classId: {}, lectureId: , userId: , exists: " + classId + lectureId + userId + exists);
        return exists;
    }

    @Override
    public Boolean checkPaymentCompleted(Integer classId, Integer lectureId, Integer userId) {
        Boolean exists = lectureRepository.existsPaymentByClassIdAndLectureIdAndUserId(classId, lectureId, userId);
        System.out.println("Check Payment Completed - classId: {}, lectureId: , userId: , exists: " + classId + lectureId + userId + exists);
        return exists;
    }

    @Override
    @Transactional
    public List<LectureResponse> getCompletedLecturesWithoutReviews(Integer classId, Integer userId) {
        List<Lecture> lectures = lectureRepository.findCompletedLecturesWithoutReviews(classId, userId);
        return lectures.stream()
                .map(LectureResponse::of)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isValidTeacher(Integer userId, int lectureId) {
        User teacher = userRepository.findById(userId).orElseThrow(() -> new ServiceException(USER_NOT_FOUND));
        boolean isTeacher = lectureRepository.existsByClassId_UserIdAndLectureId(teacher, lectureId);
        return isTeacher;
    }

    @Override
    public List<Lecture> getLecturesForDate(LocalDate date) {
        return lectureRepository.findByYearAndMonthAndDay(date.getYear(), (byte) date.getMonthValue(), (byte) date.getDayOfMonth());
    }
}
