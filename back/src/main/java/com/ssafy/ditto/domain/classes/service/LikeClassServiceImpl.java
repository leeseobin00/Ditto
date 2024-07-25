package com.ssafy.ditto.domain.classes.service;


import com.ssafy.ditto.domain.classes.domain.DClass;
import com.ssafy.ditto.domain.classes.exception.ClassNotFoundException;
import com.ssafy.ditto.domain.classes.repository.ClassRepository;
import com.ssafy.ditto.domain.classes.repository.LikeClassRepository;
import com.ssafy.ditto.domain.user.domain.User;
import com.ssafy.ditto.domain.user.exception.UserNotFoundException;
import com.ssafy.ditto.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeClassServiceImpl implements LikeClassService {
    private final LikeClassRepository likeClassRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;


    @Transactional
    public boolean checkLikeStatus(Integer userId, Integer classId) {
        DClass dClass = classRepository.findById(classId).orElseThrow(ClassNotFoundException::new);
        User user = userRepository.findById(dClass.getUserId().getUserId()).orElseThrow(UserNotFoundException::new);
        return likeClassRepository.findByUserIdAndClassId(user, dClass).isPresent();
    }
}
