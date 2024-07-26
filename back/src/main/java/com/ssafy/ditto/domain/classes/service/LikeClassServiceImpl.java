package com.ssafy.ditto.domain.classes.service;

import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.domain.LikeClass;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.LikeClassRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeClassServiceImpl implements LikeClassService {
    private final LikeClassRepository likeClassRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public boolean checkLikeStatus(Integer userId, Integer classId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        User user = userRepository.findById(dClass.getUserId().getUserId()).orElseThrow(UserNotFoundException::new);
        return likeClassRepository.findByUserIdAndClassId(user, dClass).isPresent();
    }

    @Override
    @Transactional
    public void likeClass(Integer classId, Integer userId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        User user = userRepository.findById(dClass.getUserId().getUserId()).orElseThrow(UserNotFoundException::new);

        Optional<LikeClass> exitLikeClass = likeClassRepository.findByUserIdAndClassId(user, dClass);
        if (!exitLikeClass.isPresent()) {
            LikeClass likeClass = new LikeClass();
            likeClass.setClassId(dClass);
            likeClass.setUserId(user);
            likeClassRepository.save(likeClass);
        }
    }

    @Override
    @Transactional
    public void unlikeClass(Integer classId, Integer userId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        User user = userRepository.findById(dClass.getUserId().getUserId()).orElseThrow(UserNotFoundException::new);

        Optional<LikeClass> exitLikeClass = likeClassRepository.findByUserIdAndClassId(user, dClass);
        likeClassRepository.deleteByUserIdAndClassId(user, dClass);
    }
}
