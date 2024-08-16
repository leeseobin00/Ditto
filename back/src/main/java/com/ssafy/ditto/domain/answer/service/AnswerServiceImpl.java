package com.ssafy.ditto.domain.answer.service;

import com.ssafy.ditto.domain.answer.domain.Answer;
import com.ssafy.ditto.domain.answer.dto.AnswerRequest;
import com.ssafy.ditto.domain.answer.dto.AnswerResponse;
import com.ssafy.ditto.domain.answer.exception.AnswerNotFoundException;
import com.ssafy.ditto.domain.answer.repository.AnswerRepository;
import com.ssafy.ditto.domain.question.domain.Question;
import com.ssafy.ditto.domain.question.exception.QuestionNotFoundException;
import com.ssafy.ditto.domain.question.repository.QuestionRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void createAnswer(Integer questionId, AnswerRequest answerRequest) {
        Question question = questionRepository.findById(questionId).orElseThrow(QuestionNotFoundException::new);
        User user = userRepository.findById(answerRequest.getUserId()).orElseThrow(UserNotFoundException::new);

        Answer answer = Answer.builder()
                .answer(answerRequest.getAnswer())
                .user(user)
                .question(question)
                .isDeleted(false)
                .build();

        answerRepository.save(answer);
        question.changeIsAnswered(true);
    }

    @Override
    @Transactional
    public void updateAnswer(Integer answerId, AnswerRequest answerRequest) {
        Answer answer = answerRepository.findById(answerId).orElseThrow(AnswerNotFoundException::new);
        User user = userRepository.findById(answerRequest.getUserId()).orElseThrow(UserNotFoundException::new);

        answer.setAnswer(answerRequest.getAnswer());
        answerRepository.save(answer);
    }

    @Override
    @Transactional
    public void deleteAnswer(Integer answerId) {
        Answer answer = answerRepository.findById(answerId).orElseThrow(AnswerNotFoundException::new);
        answer.setIsDeleted(true);
        answerRepository.save(answer);
    }

    @Override
    @Transactional
    public AnswerResponse getAnswer(Integer questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(QuestionNotFoundException::new);
        Answer answer = answerRepository.findByQuestion(question).orElseThrow(AnswerNotFoundException::new);
        return AnswerResponse.of(answer);
    }
}
