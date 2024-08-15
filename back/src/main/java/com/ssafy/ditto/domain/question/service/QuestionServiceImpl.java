package com.ssafy.ditto.domain.question.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.question.domain.Question;
import com.ssafy.ditto.domain.question.dto.QuestionPageResponse;
import com.ssafy.ditto.domain.question.dto.QuestionRequest;
import com.ssafy.ditto.domain.question.dto.QuestionResponse;
import com.ssafy.ditto.domain.question.exception.QuestionNotFoundException;
import com.ssafy.ditto.domain.question.repository.QuestionRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void createQuestion(int classId, QuestionRequest questionRequest) {
        User user = userRepository.findById(questionRequest.getUserId()).orElseThrow(UserNotFoundException::new);
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);

        Question question = Question.builder()
                .title(questionRequest.getTitle())
                .content(questionRequest.getContent())
                .user(user)
                .dclass(dClass)
                .isAnswered(false)
                .isDeleted(false)
                .build();
        questionRepository.save(question);
    }

    @Override
    @Transactional
    public void updateQuestion(Integer classId, Integer questionId, QuestionRequest questionRequest) {
        Question question = questionRepository.findById(questionId).orElseThrow(QuestionNotFoundException::new);

        question.setTitle(questionRequest.getTitle());
        question.setContent(questionRequest.getContent());
        questionRepository.save(question);
    }

    @Override
    @Transactional
    public void deleteQuestion(Integer classId, Integer questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(QuestionNotFoundException::new);

        question.setIsDeleted(true);
        questionRepository.save(question);
    }

    @Override
    @Transactional
    public QuestionPageResponse getClassQuestions(Integer classId, Pageable pageable) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);

        Pageable sortedByCreatedDateDesc = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdDate"));
        Page<Question> questionsPage = questionRepository.findByDclassAndIsDeletedFalse(dClass, sortedByCreatedDateDesc);

        return QuestionPageResponse.of(
                questionsPage.stream().map(QuestionResponse::of).collect(Collectors.toList()),
                questionsPage.getNumber() + 1,
                questionsPage.getTotalPages()
        );
    }
}
