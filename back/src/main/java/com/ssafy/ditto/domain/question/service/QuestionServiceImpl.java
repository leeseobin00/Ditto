package com.ssafy.ditto.domain.question.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.Lecture;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.LectureRepository;
import com.ssafy.ditto.domain.question.domain.Question;
import com.ssafy.ditto.domain.question.dto.QuestionRequest;
import com.ssafy.ditto.domain.question.repository.QuestionRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final ClassRepository classRepository;
    private final LectureRepository lectureRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void createQuestion(int classId, QuestionRequest questionRequest) {
        User user = userRepository.findById(questionRequest.getUserId()).orElseThrow(UserNotFoundException::new);
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        Lecture lecture = lectureRepository.findByLectureId(questionRequest.getLectureId());

        Question question = Question.builder()
                .title(questionRequest.getTitle())
                .content(questionRequest.getContent())
                .user(user)
                .dclass(dClass)
                .lecture(lecture)
                .isAnswered(false)
                .isDeleted(false)
                .build();
        questionRepository.save(question);
    }
}
